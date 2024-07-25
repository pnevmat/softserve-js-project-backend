const fileUpload = require('express-fileupload')
const config = require('../config')

const uploadConfig = { limits: { fileSize: config.FILE_UPLOAD_LIMIT_MB * 1024 * 1024 } }

module.exports = fileUpload(uploadConfig)
