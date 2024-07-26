const { SendError, SendResponse } = require('../../helpers')
const { controllerWrapper } = require('../../middlewares')
const ProductService = require('../../services/ProductService')
const imagekit = require('../../utils/imagekitUploader')

const delProduct = async (req, res) => {
    const { id } = req.params
    const productDB = await ProductService.findProductById(id)

    if (!productDB) return SendError.BAD_REQUEST(res, 'Товар не знайдено')

    productDB.pictures?.forEach(async p => {
        await imagekit.deleteFile(p.id)
    })

    const delProduct = await ProductService.delProduct(id)

    return SendResponse.OK(res, 'Товар видалено', { product: delProduct })
}

module.exports = {
    handler: controllerWrapper(delProduct),
}
