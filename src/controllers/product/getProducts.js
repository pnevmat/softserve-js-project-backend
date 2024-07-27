const { SendResponse } = require('../../helpers')
const { controllerWrapper } = require('../../middlewares')
const ProductService = require('../../services/ProductService')

const getProducts = async (req, res) => {
    let products = await ProductService.getProducts()

    return SendResponse.OK(res, 'Товари та категорії', { products })
}

module.exports = {
    handler: controllerWrapper(getProducts),
}
