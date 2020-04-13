COMPANY_LOWER = process.env.COMPANY_LOWER || 'balena'
COMPANY_UPPER = (COMPANY_LOWER.charAt(0).toUpperCase() + COMPANY_LOWER.slice(1)) || 'Balena'
COMPANY_ALL_CAPS = process.env.COMPANY_ALL_CAPS || 'BALENA'
COMPANY_SHORT = process.env.COMPANY_SHORT || 'balena'
COMPANY_DASH = process.env.COMPANY_DASH || 'balena-io'
OS_LOWER = process.env.OS_LOWER || 'balenaOS'
OS_UPPER = (OS_LOWER.charAt(0).toUpperCase() + OS_LOWER.slice(1)) || 'BalenaOS'
ENGINE_LOWER = process.env.ENGINE_LOWER || 'balenaEngine'
ENGINE_UPPER = (ENGINE_LOWER.charAt(0).toUpperCase() + ENGINE_LOWER.slice(1))
CLOUD_LOWER = process.env.CLOUD_LOWER || 'balenaCloud'
ETCHER_LOWER = process.env.ETCHER_LOWER || 'balenaEtcher'
DOMAIN_OS = process.env.DOMAIN_OS || 'balena.io/os'
DOMAIN_ENGINE = process.env.DOMAIN_ENGINE || 'balena.io/engine'
FORUMS_DOMAIN = process.env.DOMAIN_FORUMS || 'https://forums.balena.io'
BASE_IMAGES_LIB = process.env.BASE_IMAGES_LIB || 'balenalib'
BASE_IMAGES_CORE = process.env.BASE_IMAGES_CORE || 'balena'
CLI_LOWER = process.env.CLI_LOWER || 'balena CLI'
CLI_UPPER = (CLI_LOWER.charAt(0).toUpperCase() + CLI_LOWER.slice(1)) || 'Balena CLI'

module.exports =
  company:
    lower: COMPANY_LOWER
    upper: COMPANY_UPPER
    allCaps: COMPANY_ALL_CAPS
    short: COMPANY_SHORT
    dash: COMPANY_DASH
  cloud:
    lower: CLOUD_LOWER
  etcher:
    lower: ETCHER_LOWER
  os:
    lower: OS_LOWER
    upper: OS_UPPER
    url: DOMAIN_OS
  engine:
    lower: ENGINE_LOWER
    upper: ENGINE_UPPER
    url: DOMAIN_ENGINE
  base_images:
    lib: BASE_IMAGES_LIB
    core: BASE_IMAGES_CORE
  domain: process.env.DOMAIN || 'balena.io'
  cloud_domain: process.env.CLOUD_DOMAIN || 'balena-cloud.com'
  email_domain: 'balena.io'
  forums_domain: FORUMS_DOMAIN
  cli:
    lower: CLI_LOWER
    upper: CLI_UPPER
