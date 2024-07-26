const yup = require('yup')
const { SendError, SendResponse } = require('../../helpers')
const { controllerWrapper, validation } = require('../../middlewares')
const ProductService = require('../../services/ProductService')
const imagekit = require('../../utils/imagekitUploader')

const schema = yup.object().shape({
    image: yup.object().shape({
        id: yup.string().required(),
        url: yup.string().required(),
    }),
    productId: yup.string().required(),
})

const delImage = async (req, res) => {
    const { productId, image } = req.body
    const productDB = await ProductService.findProductById(productId)

    if (!productDB) return SendError.BAD_REQUEST(res, 'Товар не знайдено')

    await imagekit.deleteFile(image.id)
    // eslint-disable-next-line no-console

    const product = await ProductService.delImage(productDB, image.url)

    return SendResponse.OK(res, 'Зображення видалено', { product })
}

module.exports = {
    middleware: validation(schema),
    handler: controllerWrapper(delImage),
}
