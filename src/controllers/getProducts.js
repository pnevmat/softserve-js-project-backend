const { SendResponse } = require('../../helpers')
const { controllerWrapper } = require('../../middlewares')
const ProductService = require('../../services/ProductServices')

const getProducts = async (req, res) => {
    const { search, filter, category, subcategory, limit, userId } = req.query

    const categories = await ProductService.checkProductsAndGetCategories()
    let products = await ProductService.getFilteredProducts({ search, filter, category, subcategory, limit, userId })

    if (!isAdmin) products = products.filter(p => !p.hidden)

    return SendResponse.OK(res, 'Товари та категорії', { categories, products })
}

module.exports = {
    handler: controllerWrapper(getProducts),
}
