COMPANY_LOWER = process.env.COMPANY_LOWER || 'balena'
COMPANY_UPPER = (COMPANY_LOWER.charAt(0).toUpperCase() + COMPANY_LOWER.slice(1)) || 'Balena'
COMPANY_ALL_CAPS = process.env.COMPANY_ALL_CAPS || 'BALENA'
COMPANY_SHORT = process.env.COMPANY_SHORT || 'balena'
COMPANY_DASH = process.env.COMPANY_DASH || 'balena-io'
OS_LOWER = process.env.OS_LOWER || 'balenaOS'
OS_UPPER = (OS_LOWER.charAt(0).toUpperCase() + OS_LOWER.slice(1)) || 'BalenaOS'
ENGINE_LOWER = process.env.ENGINE_LOWER || 'balenaEngine'
ENGINE_UPPER = (ENGINE_LOWER.charAt(0).toUpperCase() + ENGINE_LOWER.slice(1))
DOMAIN_OS = process.env.DOMAIN_OS || 'balena.io/os'
DOMAIN_ENGINE = process.env.DOMAIN_ENGINE || 'balena.io/engine'
BASE_IMAGES_LIB = process.env.BASE_IMAGES_LIB || 'resin'
BASE_IMAGES_CORE = process.env.BASE_IMAGES_CORE || 'resin'

module.exports =
  company:
    lower: COMPANY_LOWER
    upper: COMPANY_UPPER
    allCaps: COMPANY_ALL_CAPS
    short: COMPANY_SHORT
    dash: COMPANY_DASH
  os:
    lower: OS_LOWER
    upper: OS_UPPER
    url: DOMAIN_OS
  engine:
    lower: ENGINE_LOWER
    upper: ENGINE_UPPER
    url: DOMAIN_ENGINE
  base:
    lib: BASE_IMAGES_LIB
    core: BASE_IMAGES_CORE
  domain: process.env.DOMAIN || 'balena.io'
  dashboard_domain: 'balena-cloud.com'
  email_domain: 'balena.io'
