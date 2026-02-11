#!/usr/bin/env node

const { writeFile, readFile, readdir, unlink } = require('fs/promises');
const path = require('path');
const Handlebars = require('handlebars');

const { updateSummaryFile } = require('./utils');
const cloudDictionary = require('../config/dictionaries/cloud.json');

const DEST_FOLDER = '../cloud-iot-provisioning';
const TEMPLATE_PATH = '../templates/cloud-iot-provisioning.md';

Handlebars.registerHelper('is', function(a, b, options) {
  if (a === b) return options.fn();
});

Handlebars.registerHelper('isnt', function(a, b, options) {
  if (a !== b) return options.fn();
});

const generateCloudIoTProvisioningPages = async () => {
  const tmpl = await readFile(path.join(__dirname, TEMPLATE_PATH));
  const template = Handlebars.compile(tmpl.toString());

  await Promise.all(
    cloudDictionary.map(async (cloudPlatform) => {
      const compiledTemplate = template({
        $cloud: cloudPlatform,
      });
      await writeFile(path.join(__dirname, DEST_FOLDER, `${cloudPlatform.id}.md`), compiledTemplate);
      
      console.log(`✅ Generated ${DEST_FOLDER}/${cloudPlatform.id}.md`);
    }),
  );
};

(async () => {
  await generateCloudIoTProvisioningPages();
  
  await updateSummaryFile(
    cloudDictionary,
    'Provision with Cloud IoT',
    '../cloud-iot-provisioning',
    (cloudPlatform) => `Cloud IoT Provisioning with ${cloudPlatform}`,
    );
})();