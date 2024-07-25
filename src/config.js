/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv')

let envFilePath = ''
let isLocal = false
if (process.argv.some(a => a === 'dev')) envFilePath = '.env.development'
if (process.argv.some(a => a === 'prod')) envFilePath = '.env'
if (process.argv.some(a => a === 'local')) isLocal = true

envFilePath.length ? dotenv.config({ path: envFilePath }) : dotenv.config()
const config = {
    DEV: {
        SENTRY_ENV: 'development',
        PORT: 5502,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'http://localhost:5502',
        CLIENT_URL: 'http://localhost:3000',
        FILE_UPLOAD_LIMIT_MB: 25,
    },
    PROD: {
        SENTRY_ENV: 'production',
        PORT: 8080,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'https://ekip-auto-bfvks.ondigitalocean.app',
        CLIENT_URL: 'https://ekip-auto.com',
        FILE_UPLOAD_LIMIT_MB: 25,
    },
}

const secretesNamesList = ['DB', 'IMAGEKIT_PUBLIC_KEY', 'IMAGEKIT_PRIVATE_KEY', 'IMAGEKIT_ID']

const secretes = {}
secretesNamesList.forEach(s => (secretes[s] = process.env[s]))

const env = process.env?.ENV

module.exports = {
    ...config[env],
    ...secretes,
}

module.exports.secretesNamesList = secretesNamesList
