const yup = require('yup')
const { SendError, SendResponse } = require('../../helpers')
const { controllerWrapper, validation } = require('../../middlewares')
const ProductService = require('../../services/ProductServices')

const schema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string(),
    brand: yup.string(),
    price: yup.number(),
    inStock: yup.number(),
    category: yup.string(),
    subcategory: yup.string(),
    subsubcategory: yup.number(),
    size: yup.array().of(
        yup.object().shape({
            size: yup.string(),
        }),
    ),
    width: yup.array().of(
        yup.object().shape({
            width: yup.string(),
        }),
    ),
    color: yup.array().of(
        yup.object().shape({
            color: yup.string(),
        }),
    ),
    style: yup.string(),
    occasion: yup.string(),
    feature: yup.string(),
    material: yup.string(),
    pattern: yup.string(),
    theme: yup.string,
    accent: yup.string,
    description: yup.array().of(yup.string()),
})

const updateProduct = async (req, res) => {
    const { id, name, brand, price, inStock, category, subcategory, subsubcategory, size, width, color, style, occasion, feature, material, pattern, theme, accent, description } = req.body
    const product = await ProductService.updateProduct(id, {
        name,
        brand,
        price,
        inStock,
        category,
        subcategory,
        subsubcategory,
        size,
        width,
        color,
        style,
        occasion,
        feature,
        material,
        pattern,
        theme,
        accent,
        description,
    })

    if (!product) return SendError.BAD_REQUEST(res, 'Помилка оновлення')

    return SendResponse.OK(res, 'Товар оновлено', { product: await product.getPublicInfo() })
}

module.exports = {
    middleware: validation(schema),
    handler: controllerWrapper(updateProduct),
}
