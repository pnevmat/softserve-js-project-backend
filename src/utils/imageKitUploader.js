const ImageKit = require('imagekit')
const config = require('../config')

const imagekit = new ImageKit({
    publicKey: `${config.IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${config.IMAGEKIT_PRIVATE_KEY}`,
    urlEndpoint: `${config.IMAGEKIT_URL}/${config.IMAGEKIT_ID}`,
})

module.exports = imagekit
