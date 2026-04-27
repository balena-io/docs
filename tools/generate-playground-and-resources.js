const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { updateSummaryFile } = require('./utils');

const resourceJsonPath = path.resolve('./config/dictionaries/resource.json');
const openApiYamlOutputPath = path.resolve('./openapi.yaml');
const resourcesOutputDir = path.resolve('./pages/reference/api/resources/');
const API_BASE = 'https://api.balena-cloud.com';

const generateSpec = (resources) => {
	const openapi = {
		openapi: '3.0.0',
		info: {
			title: 'Balena API Spec',
			description: 'Automated API spec generation with alphabetized resources.',
			version: '7.0.0',
		},
		servers: [{ url: API_BASE }],
		components: {
			securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
			schemas: {},
		},
		paths: {},
		security: [{ bearerAuth: [] }],
	};

	const injectedTags = new Set();

	resources.forEach((resource) => {
		// skip fake resources, i.e. balenaos_versions, supervisor_release
		if (
			!resource.examples.some((ex) =>
				// keep "fleet" resources as they're actually applicationss
				ex.endpoint.includes(resource.id.replaceAll('fleet', 'application')),
			)
		) {
			return;
		}
		const tagName = (resource.name || resource.id).trim();

		// Prepare fields
		if (resource.fields && resource.fields.length > 0) {
			openapi.components.schemas[resource.id] = {
				type: 'object',
				title: `${tagName} Model`,
				properties: Object.fromEntries(
					resource.fields.map((f) => [
						f,
						{ description: 'Type information not available yet' },
					]),
				),
			};
		}

		// Prepare fields table
		let fieldsTable = '';
		if (resource.fields.length) {
			fieldsTable = `## ${tagName} Resource Fields\n\n| Field |\n| :--- |\n`;
			resource.fields.forEach((field) => {
				fieldsTable += `| \`${field}\` |\n`;
			});
			fieldsTable += '\n\n---\n';
		}

		const v7Examples = resource.examples.filter((ex) =>
			ex.endpoint.startsWith('/v7/'),
		);

		// Process examples to populate endpoints and methods
		v7Examples.forEach(({ method: m, endpoint }) => {
			const method = m.toLowerCase();

			openapi.paths[endpoint] ??= {};
			if (!openapi.paths[endpoint][method]) {
				const op = {
					tags: [tagName],
					parameters: [],
				};

				// Populate parameters so GitBook shows the input fields
				const paramMatches = endpoint.match(/<([^>]+)>/g);
				if (paramMatches) {
					paramMatches.forEach((match) => {
						const paramName = match.replace(/<|>/g, '');
						op.parameters.push({
							name: paramName,
							in: 'path',
							required: true,
						});
					});
				}

				if (!injectedTags.has(tagName) && fieldsTable !== '') {
					op['x-fields-table'] = fieldsTable;
					injectedTags.add(tagName);
				}
				openapi.paths[endpoint][method] = op;
			}
		});
	});

	Object.values(openapi.paths).forEach((pathObj) => {
		Object.values(pathObj).forEach((op) => {
			let fullDescription = '';
			if (op['x-fields-table']) {
				fullDescription += op['x-fields-table'];
			}

			op.description = fullDescription.trim();
			delete op['x-fields-table'];

			// Clean up empty parameter arrays for a tidier YAML
			if (op.parameters?.length === 0) {
				delete op.parameters;
			}
		});
	});

	fs.writeFileSync(
		openApiYamlOutputPath,
		yaml.dump(openapi, { lineWidth: -1, noRefs: true }),
		'utf8',
	);
	console.log(`Open API spec generated`);
};

const generateResources = (resources) => {
	if (fs.existsSync(resourcesOutputDir)) {
		fs.rmdirSync(resourcesOutputDir, { recursive: true });
	}
	fs.mkdirSync(resourcesOutputDir, { recursive: true });
	fs.writeFileSync(
		path.resolve(resourcesOutputDir, 'README.md'),
		'# Resources',
		'utf8',
	);

	resources.forEach((resource) => {
		let examples = `# ${resource.name || resource.id}\n\n`;
		// Prepare fields table
		let fieldsTable = '';
		if (resource.fields.length) {
			examples += `## Available Fields\n\n`;
			fieldsTable = `| Field |\n| :--- |\n`;
			resource.fields.forEach((field) => {
				fieldsTable += `| \`${field}\` |\n`;
			});
			fieldsTable += '\n\n---\n';
		}
		examples += fieldsTable;
		examples += `## Examples \n\n`;

		for (const example of resource.examples) {
			examples += `### ${example.summary}\n\n`;
			if (example.description) {
				examples += `${example.description}\n\n`;
			}
			examples += `\`\`\`bash\n${example.method} "${API_BASE}${example.endpoint}${example.filters}" \\
-H "Content-Type: ${example['content-type'] ?? 'application/json'}" \\
-H "Authorization: Bearer <AUTH_TOKEN>" ${example.data ? '\\' : ''}
${example.data ? `--data '${example.data}'\n` : ''}\`\`\`\n\n`;
		}

		fs.writeFileSync(
			path.resolve(resourcesOutputDir, resource.id + '.md'),
			examples,
			'utf8',
		);
	});
	updateSummaryFile(
		resources.map((r) => ({ name: r.name || r.id, id: r.id })),
		'Resources',
		'reference/api/resources',
		(name) => name,
	);
	console.log('Resources generated');
};

function generateSpecAndExamples() {
	console.log(`Reading from: ${resourceJsonPath}`);
	console.log(`Targeting output at: ${openApiYamlOutputPath}`);

	if (!fs.existsSync(resourceJsonPath)) {
		console.error(`Error: Input file not found at ${resourceJsonPath}`);
		process.exit(1);
	}

	// Safety check: Is the output path already a directory?
	if (
		fs.existsSync(openApiYamlOutputPath) &&
		fs.lstatSync(openApiYamlOutputPath).isDirectory()
	) {
		console.error(
			`Error: The output path ${openApiYamlOutputPath} is a directory. Please delete the folder or choose a different filename.`,
		);
		process.exit(1);
	}

	// Ensure output directory exists
	const resolvedOutputDir = path.dirname(openApiYamlOutputPath);
	if (!fs.existsSync(resolvedOutputDir)) {
		fs.mkdirSync(resolvedOutputDir, { recursive: true });
	}

	const rawData = fs.readFileSync(resourceJsonPath, 'utf8');
	let resources = JSON.parse(rawData);

	// --- Alphabetize Resources by Name/ID ---
	resources.sort((a, b) => {
		const nameA = (a.name || a.id).toLowerCase();
		const nameB = (b.name || b.id).toLowerCase();
		return nameA.localeCompare(nameB);
	});

	generateSpec(resources);
	generateResources(resources);
}

generateSpecAndExamples();
