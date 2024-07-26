const yup = require('yup')
const { SendError, SendResponse } = require('../../helpers')
const { controllerWrapper, validation } = require('../../middlewares')
const ProductService = require('../../services/ProductService')
const imagekit = require('../../utils/imagekitUploader')

const schema = yup.object().shape({
    imageId: yup.string().required(),
    productId: yup.string().required(),
    main: yup.boolean().required(),
})

const updateImage = async (req, res) => {
    const { productId, main } = req.body
    // eslint-disable-next-line
    const { image } = req.files
    const productDB = await ProductService.findProductById(productId)

    if (!productDB) return SendError.BAD_REQUEST(res, 'Товар не знайдено')
    if (!image) return SendError.BAD_REQUEST(res, 'Помилка завантаження файлу')

    const response = await imagekit.upload({
        file: image.data,
        fileName: image.name,
    })

    const product = await ProductService.updateProductImage(productDB, { id: response.fileId, url: response.url }, main)

    return SendResponse.OK(res, 'Зображення додано', { product })
}

module.exports = {
    middleware: validation(schema),
    handler: controllerWrapper(updateImage),
}
