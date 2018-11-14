DOCS_SOURCE_DIR = 'pages'
TEMPLATES_DIR = 'templates'
PARTIALS_DIR = 'shared'

DYNAMIC_DOCS = /.*(getting-started|overview|network).*/

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
  editPageLink: 'https://github.com/resin-io/docs/edit/master'
  links: require('./links')
  names: require('./names')
  pathPrefix: process.env.PATH_PREFIX || '/docs'
  layoutLocals:
    dashboardUrl: process.env.DASHBOARD_SITE || 'https://dashboard.resin.io'
    logo: '/img/logo.svg'
    baseUrl: process.env.BASE_URL || 'https://docs.resin.io'
    menuLinks: MAIN_MENU_LINKS
    fbAppId: FB_APP_ID
    defaultThumbnail: '/img/docs-preview.png'
