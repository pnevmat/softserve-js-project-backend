const ProductModel = require('../models/ProductModel')
const { ObjectId } = require('mongodb')
const { generateRandomNumbers } = require('../utils/utils')

const productService = {
    createProduct: async fields => {
        const user = await ProductModel.create(fields)
        return user
    },

    findProductById: async id => {
        return await ProductModel.findById(id)
    },

    updateProduct: async (id, fields) => {
        if (fields.imgSet) return await ProductModel.findByIdAndUpdate(id, { ...fields, imgSet: [...fields.imgSet] }, { new: true })
        return await ProductModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    },

    updateProductImage: async (product, image, main) => {
        if (!product.imgSet) product.pictures = []
        if (main) product.pictures.unshift(image)
        else product.pictures.push(image)
        product.pictures = product.pictures.filter(p => p.url.length > 0)
        await product.save()
        return await product.getPublicInfo()
    },

    delImage: async (product, imageUrl) => {
        product.pictures = product.pictures?.filter(p => p.url !== imageUrl)
        await product.save()
        return await product.getPublicInfo()
    },

    getProducts: async () => {
        const productsDB = await ProductModel.find()
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    },

    delProduct: async id => {
        const product = await ProductModel.findByIdAndDelete(id)
        if (!product) return null
        return product
    },

    checkProductsAndGetCategories: async () => {
        const categories = []
        const products = await ProductModel.find()
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            if (!product.priceUAH && !product.priceUSD) {
                product.hidden = true
                await product.save()
            }
            if (product.category && !categories.some(c => c.category === product.category)) categories.push({ category: product.category, id: generateRandomNumbers(6), subcategories: [] })
            if (product.subCategory && product.category) {
                const index = categories.findIndex(c => c.category === product.category)
                if (index !== -1 && !categories[index].subcategories.some(sc => sc.title === product.subCategory))
                    categories[index].subcategories.push({ id: generateRandomNumbers(6), title: product.subCategory })
            }
        }

        return categories
    },

    getFilteredProducts: async ({ search, filter, category, subcategory, limit, userId }) => {
        const validUserId = userId && ObjectId.isValid(userId) ? userId : undefined

        if (validUserId && filter === ProductFilter.LAST_SEEN) return await this.findUserLastSeenProducts(validUserId)

        if (filter === ProductFilter.LAST_SEEN) return await this.findAllLastSeenProducts()

        if (filter === ProductFilter.INTEREST) return await this.findInterestProducts()

        if (filter === ProductFilter.TOP) return await this.findTopProducts()

        if (search && search.length) return await this.searchProducts(search, limit)

        let model = {}

        if (subcategory) {
            model = { subCategory: subcategory }
        } else if (category) model = { category }
        const productsDB = limit ? await ProductModel.find(model).limit(limit) : await ProductModel.find(model)
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    },

    getFavoriteProducts: async productsId => {
        const productsDB = await ProductModel.find({ _id: { $in: productsId } })
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    },

    searchProducts: async (search, limit) => {
        const regex = new RegExp(search, 'i')
        const productsDB = limit
            ? await ProductModel.find({
                  $or: [{ name: regex }, { sku: regex }],
              }).limit(limit)
            : await ProductModel.find({
                  $or: [{ name: regex }, { sku: regex }],
              })
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    },
}

module.exports = productService
