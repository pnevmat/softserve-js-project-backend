const { Schema, model, SchemaTypes } = require('mongoose')

const imageSchema = new Schema({
    productId: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    main: {
        type: Boolean,
        required: true,
    },
    imageId: {
        type: SchemaTypes.ObjectId,
    },
})

const Image = model('Product', imageSchema)

module.exports = Image
