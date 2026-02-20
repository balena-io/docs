const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Capture CLI arguments
const inputDir = process.argv[2];
const inputFile = process.argv[3];
const outputDir = process.argv[4];
const outputFile = process.argv[5];

if (!inputDir || !inputFile || !outputDir || !outputFile) {
	console.error(
		'Usage: node convert.js <input_dir> <input_file> <output_dir> <output_file>',
	);
	process.exit(1);
}

const inputPath = path.resolve(inputDir, inputFile);
const outputPath = path.resolve(outputDir, outputFile);

function convertResourceToOpenApi(inputPath, outputPath) {
	console.log(`Reading from: ${inputPath}`);
	console.log(`Targeting output at: ${outputPath}`);

	if (!fs.existsSync(inputPath)) {
		console.error(`Error: Input file not found at ${inputPath}`);
		process.exit(1);
	}

	// Safety check: Is the output path already a directory?
	if (fs.existsSync(outputPath) && fs.lstatSync(outputPath).isDirectory()) {
		console.error(
			`Error: The output path ${outputPath} is a directory. Please delete the folder or choose a different filename.`,
		);
		process.exit(1);
	}

	// Ensure output directory exists
	const resolvedOutputDir = path.dirname(outputPath);
	if (!fs.existsSync(resolvedOutputDir)) {
		fs.mkdirSync(resolvedOutputDir, { recursive: true });
	}

	const rawData = fs.readFileSync(inputPath, 'utf8');
	let resources = JSON.parse(rawData);

	// --- Alphabetize Resources by Name/ID ---
	resources.sort((a, b) => {
		const nameA = (a.name || a.id).toLowerCase();
		const nameB = (b.name || b.id).toLowerCase();
		return nameA.localeCompare(nameB);
	});

	const openapi = {
		openapi: '3.0.0',
		info: {
			title: 'Balena API Spec',
			description: 'Automated API spec generation with alphabetized resources.',
			version: '7.0.0',
		},
		servers: [{ url: 'https://api.balena-cloud.com' }],
		components: {
			securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
			schemas: {},
		},
		paths: {},
		security: [{ bearerAuth: [] }],
	};

	const injectedTags = new Set();

	const unescapeEndpoint = (str) => {
		if (!str) return '';
		return str
			.replace(/\\\$/g, '$')
			.replace(/%20/g, ' ')
			.replace(/%27/g, "'")
			.replace(/%28/g, '(')
			.replace(/%29/g, ')');
	};

	const formatJsonData = (dataStr) => {
		if (!dataStr || dataStr.trim() === '') return '';
		let fixed = dataStr.replace(/"\s*\n\s*"/g, '",\n"');
		fixed = fixed
			.replace(/: "true"/g, ': true')
			.replace(/: "false"/g, ': false');
		try {
			let pretty = JSON.stringify(JSON.parse(fixed), null, 4);
			return pretty.replace(/: "(\s*<[^>]+>\s*)"/g, ': $1');
		} catch (e) {
			return fixed.replace(/: "(\s*<[^>]+>\s*)"/g, ': $1');
		}
	};

	resources.forEach((resource) => {
		const tagName = (resource.name || resource.id).trim();

		if (resource.fields && resource.fields.length > 0) {
			openapi.components.schemas[resource.id] = {
				type: 'object',
				title: `${tagName} Model`,
				properties: Object.fromEntries(
					resource.fields.map((f) => [f, { type: 'string' }]),
				),
			};
		}

		let fieldsTable = `## ${tagName} Resource Fields\n\n| Field |\n| :--- |\n`;
		resource.fields.forEach((field) => {
			fieldsTable += `| \`${field}\` |\n`;
		});
		fieldsTable += '\n\n---\n';

		resource.examples.forEach((ex) => {
			const method = ex.method.toLowerCase();
			const cleanEndpoint = unescapeEndpoint(ex.endpoint);

			let baseKey = cleanEndpoint
				.split('?')[0]
				.replace(/\(/g, '/')
				.replace(/\)/g, '')
				.replace(/<([^>]+)>/g, '{$1}');
			let pathKey = baseKey;

			const existingPath = openapi.paths[pathKey];
			if (existingPath && Object.values(existingPath)[0].tags[0] !== tagName) {
				pathKey = `${baseKey}#${tagName.replace(/\s+/g, '_')}`;
			}

			if (!openapi.paths[pathKey]) openapi.paths[pathKey] = {};
			if (!openapi.paths[pathKey][method]) {
				const op = {
					tags: [tagName],
					summary: '',
					description: '',
					'x-variations': [],
				};
				if (!injectedTags.has(tagName) && fieldsTable !== '') {
					op['x-fields-table'] = fieldsTable;
					injectedTags.add(tagName);
				}
				openapi.paths[pathKey][method] = op;
			}

			const op = openapi.paths[pathKey][method];
			const formattedData = formatJsonData(ex.data);

			if (
				ex.data &&
				ex.data.trim() !== '' &&
				(method === 'post' || method === 'patch')
			) {
				if (!op.requestBody) {
					op.requestBody = {
						content: {
							'application/json': { schema: { type: 'object' }, examples: {} },
						},
					};
				}
				try {
					const jsonReadyValue = JSON.parse(
						formattedData.replace(/: <([^>]+)>/g, ': "<$1>"'),
					);
					op.requestBody.content['application/json'].examples[ex.id] = {
						summary: ex.summary,
						value: jsonReadyValue,
					};
				} catch (e) {
					op.requestBody.content['application/json'].examples[ex.id] = {
						summary: ex.summary,
						value: formattedData,
					};
				}
			}

			if (op.summary === '') {
				op.summary = ex.summary;
				op.description = ex.description || '';
				op['x-primary-endpoint'] = cleanEndpoint;
				op['x-primary-method'] = ex.method;
				op['x-primary-data'] = formattedData;
			} else {
				op['x-variations'].push({
					summary: ex.summary,
					filter: ex.filters || 'None',
					description: ex.description,
					endpoint: cleanEndpoint,
					method: ex.method,
					data: formattedData,
				});
			}
		});
	});

	Object.values(openapi.paths).forEach((pathObj) => {
		Object.values(pathObj).forEach((op) => {
			let fullDescription = '';
			if (op['x-fields-table']) fullDescription += op['x-fields-table'];
			if (op['x-primary-method']) {
				if (op['x-fields-table']) fullDescription += '\n';
				fullDescription += `\`${op['x-primary-method']} ${op['x-primary-endpoint']}\`\n`;
				if (op['x-primary-data'] && op['x-primary-data'].trim() !== '') {
					fullDescription += `\n**Request Body:**\n\`\`\`json\n${op['x-primary-data']}\n\`\`\`\n`;
				}
				if (op.description) fullDescription += `\n${op.description}\n`;
			}

			if (op['x-variations'] && op['x-variations'].length > 0) {
				fullDescription += '\n\n### Usage Variations\n';
				op['x-variations'].forEach((v) => {
					fullDescription += `\n--- \n#### ${v.summary}\n`;
					fullDescription += `\`${v.method} ${v.endpoint}${v.filter !== 'None' ? unescapeEndpoint(v.filter) : ''}\`\n`;
					if (v.data && v.data.trim() !== '') {
						fullDescription += `\n**Request Body:**\n\`\`\`json\n${v.data}\n\`\`\`\n`;
					}
					if (v.description) fullDescription += `\n${v.description}\n`;
				});
			}
			op.description = fullDescription.trim();
			delete op['x-variations'];
			delete op['x-primary-endpoint'];
			delete op['x-primary-method'];
			delete op['x-primary-data'];
			delete op['x-fields-table'];
		});
	});

	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	fs.writeFileSync(
		outputPath,
		yaml.dump(openapi, { lineWidth: -1, noRefs: true }),
		'utf8',
	);
	console.log(`Alphabetized spec generated at: ${outputPath}`);
}

convertResourceToOpenApi(inputPath, outputPath);
