# this is a normal CoffeeScript CommonJS module.
# Data here can be used for strings interpolation, or reuse variables across the documentation

RPI_PRODUCTS = 'https://www.raspberrypi.org/products'

module.exports =
  raspberrypi:
    aplus: "#{RPI_PRODUCTS}/raspberry-pi-1-model-a-plus/"
    bplus: "#{RPI_PRODUCTS}/raspberry-pi-1-model-b-plus/"
  githubMain: 'https://github.com/balena-io'
  githubLabs: 'https://github.com/balenalabs'
  githubPlayground: 'https://github.com/balena-io-playground'
  githubExamples: 'https://github.com/balena-io-examples'
  githubModules: 'https://github.com/balena-io-modules'
  githubOS: 'https://github.com/balena-os'
  githubBaseImages: 'https://github.com/balena-io-library/base-images/tree/master/balena-base-images/device-base'
  githubPythonBaseImages: 'https://github.com/balena-io-library/base-images/tree/master/balena-base-images/python'
  githubGolangBaseImages: 'https://github.com/balena-io-library/base-images/tree/master/balena-base-images/golang'
  githubNodeBaseImages: 'https://github.com/balena-io-library/base-images/tree/master/balena-base-images/node'
  githubOpenJDKBaseImages: 'https://github.com/balena-io-library/base-images/tree/master/balena-base-images/openjdk'
  githubDotnetBaseImages: 'https://github.com/balena-io-library/base-images/tree/master/balena-base-images/dotnet'
  githubLibrary: 'https://github.com/balena-io-library'
  apiBase: process.env.API_BASE || 'https://api.balena-cloud.com'
  mainSiteUrl: 'https://balena.io'
  blogSiteUrl: 'https://balena.io/blog'
  osSiteUrl: 'https://www.balena.io/os'
  engineSiteUrl: 'https://www.balena.io/engine'
  dashboardUrl: process.env.DASHBOARD_SITE || 'https://dashboard.balena-cloud.com'
  balenaHubUrl: 'https://hub.balena.io'
  etcherSiteUrl: 'https://www.balena.io/etcher'
  githubCli: 'https://github.com/balena-io/balena-cli'
  supportUrl: 'https://www.balena.io/support'
  externalDocs:
    "python-sdk": 'https://github.com/balena-io/balena-sdk-python/edit/master/DOCUMENTATION.md'
    "node-sdk": 'https://github.com/balena-io/balena-sdk/edit/master/DOCUMENTATION.md'
    "balena-cli": 'https://github.com/balena-io/balena-cli/blob/master/CONTRIBUTING.md#editing-documentation-files-readme-install-reference-website'
    "supervisor-api": 'https://github.com/balena-io/balena-supervisor/edit/master/docs/API.md'
    "update-locking": "https://github.com/balena-io/balena-supervisor/edit/master/docs/update-locking.md"
    "diagnostics": "https://github.com/balena-io/device-diagnostics/edit/master/diagnostics.md"
    "device-diagnostics": "https://github.com/balena-io/device-diagnostics/edit/master/device-diagnostics.md"
    "supervisor-state": "https://github.com/balena-io/supervisor-state/edit/master/supervisor-state.md"
    "cli-masterclass": "https://github.com/balena-io/balena-cli-masterclass/edit/master/README.md"
    "advanced-cli": "https://github.com/balena-io/balena-cli-advanced-masterclass/edit/master/README.md"
    "host-os-masterclass": "https://github.com/balena-io/balenaos-masterclass/edit/master/README.md"
    "services-masterclass": "https://github.com/balena-io/services-masterclass/edit/master/README.md"
    "fleet-management": "https://github.com/balena-io/balena-fleet-management-masterclass/edit/master/README.md"
    "device-debugging": "https://github.com/balena-io/debugging-masterclass/edit/master/README.md"
    "docker-masterclass": "https://github.com/balena-io/docker-masterclass/edit/master/README.md"
    "rollbacks": "https://github.com/balena-os/meta-balena/edit/master/docs/rollbacks.md"
    "customer-board-support": "https://github.com/balena-os/meta-balena/edit/master/contributing-device-support.md"
    "resources": "https://github.com/balena-io/docs/edit/master/pages/reference/api/resources.md"
    "cloud-iot-provisioning": "https://github.com/balena-io/docs/edit/master/pages/learn/develop/cloud-iot-provisioning.md"
    "getting-started": "https://github.com/balena-io/docs/edit/master/pages/learn/getting-started.md"
    "troubleshooting": "https://github.com/balena-io/docs/edit/master/pages/faq/troubleshooting.md"
    "configuration-list": "https://github.com/balena-io/docs/edit/master/pages/reference/supervisor/configuration-list.md"
