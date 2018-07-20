COMPANY_LOWER = process.env.COMPANY_LOWER || 'resin.io'
COMPANY_UPPER = (COMPANY_LOWER.charAt(0).toUpperCase() + COMPANY_LOWER.slice(1)) || 'Resin.io'
COMPANY_ALL_CAPS = process.env.COMPANY_ALL_CAPS || 'RESIN'
COMPANY_SHORT = process.env.COMPANY_SHORT || 'resin'
COMPANY_DASH = process.env.COMPANY_DASH || 'resin-io'
OS_LOWER = process.env.OS_LOWER || 'resinOS'
OS_UPPER = (OS_LOWER.charAt(0).toUpperCase() + OS_LOWER.slice(1)) || 'ResinOS'
ENGINE_LOWER = process.env.ENGINE_LOWER || 'balena'
ENGINE_UPPER = (ENGINE_LOWER.charAt(0).toUpperCase() + ENGINE_LOWER.slice(1))
DOMAIN = process.env.DOMAIN || 'resin.io'


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
  engine:
    lower: ENGINE_LOWER
    upper: ENGINE_UPPER
  domain: DOMAIN
