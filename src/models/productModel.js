const { Schema, model, SchemaTypes } = require('mongoose')

// name,
// brand,
// price,
// inStock,
// category,
// subcategory,
// subsubcategory,
// size,
// width,
// color,
// style,
// occasion,
// feature,
// material,
// pattern,
// theme,
// accent,
// description,

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        subcategory: {
            type: String,
            required: true,
        },
        subsubcategory: {
            type: String,
            required: true,
        },
        size: {
            type: Array,
            required: true,
        },
        width: {
            type: Array,
            required: true,
        },
        color: {
            type: Array,
            required: true,
        },
        style: {
            type: String,
            required: true,
        },
        occasion: {
            type: String,
            required: true,
        },
        feature: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        pattern: {
            type: String,
            required: true,
        },
        theme: {
            type: String,
            required: true,
        },
        accent: {
            type: String,
            required: true,
        },
        description: {
            type: Array,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id
                return ret
            },
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id
                return ret
            },
        },
    },
)

const Product = model('Product', productSchema)

module.exports = Product
