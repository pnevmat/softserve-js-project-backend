const { SendError, SendResponse } = require('../../helpers')
const { controllerWrapper } = require('../../middlewares')
const ProductService = require('../../services/ProductService')

const getOneProduct = async (req, res) => {
    const { id } = req.params

    if (!id) return SendError.BAD_REQUEST(res, `Не вказані обов'язкові параметри`)

    const product = await ProductService.getProduct(id)

    return SendResponse.OK(res, 'Продукт знайдено', { product })
}

module.exports = {
    handler: controllerWrapper(getOneProduct),
}
