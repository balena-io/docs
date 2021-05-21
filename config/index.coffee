DOCS_SOURCE_DIR = 'pages'
TEMPLATES_DIR = 'templates'
PARTIALS_DIR = 'shared'

DYNAMIC_DOCS = /.*(getting-started|overview|network|cloud-block).*/

# These files are pulled in externally and so cannot be edited in the base repo
EXTERNAL_DOCS = /.*(python-sdk|node-sdk|balena-cli|supervisor-api|update-locking|diagnostics|google-iot|azure-iot-hub|cli-masterclass|advanced-cli|host-os-masterclass|services-masterclass|fleet-management|device-debugging|docker-masterclass).*/

FB_APP_ID = '221218511385682'

DOMAIN = "https://#{process.env.DOMAIN || 'balena.io'}"

MAIN_MENU_LINKS = [
  {
    "title": "What is Balena",
    "link": "#{DOMAIN}/what-is-balena"
  },
  {
    "title": "Forums",
    "link": "https://forums.balena.io"
  },
  {
    "title": "Blog",
    "link": "#{DOMAIN}/blog"
  },
  {
    "title": "Pricing",
    "link": "#{DOMAIN}/pricing"
  },
  {
    "title": "Team",
    "link": "#{DOMAIN}/team"
  },
  {
    "title": "Contact",
    "link": "#{DOMAIN}/contact"
  }
]

module.exports =
  docsExt: 'md'
  docsSourceDir: DOCS_SOURCE_DIR
  docsDestDir: 'contents'
  templatesDir: TEMPLATES_DIR
  partialsDir: PARTIALS_DIR
  dynamicDocs: DYNAMIC_DOCS
  externalDocs: EXTERNAL_DOCS
  editPageLink: 'https://github.com/balena-io/docs/edit/master'
  links: require('./links')
  names: require('./names')
  pathPrefix: process.env.PATH_PREFIX || '/docs'
  layoutLocals:
    dashboardUrl: process.env.DASHBOARD_SITE || 'https://dashboard.balena-cloud.com'
    logo: '/img/logo.svg'
    baseUrl: process.env.BASE_URL || 'https://www.balena.io/docs'
    menuLinks: MAIN_MENU_LINKS
    fbAppId: FB_APP_ID
    defaultThumbnail: 'https://www.balena.io/docs/img/logo.png'
