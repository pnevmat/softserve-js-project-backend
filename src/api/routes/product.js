const express = 'express'
const ProductController = require('../../controllers/product')
// import filesMiddleware from '../../middlewares/files'
// import imagesMiddleware from '../../middlewares/images'

const router = express.Router()

router.get('/', ProductController.getProducts.handler)

// router.get('/favorite', ProductController.getFavoriteProducts.middleware, ProductController.getFavoriteProducts.handler)

router.get('/:id', ProductController.getOneProduct.handler)

// router.put('/', ProductController.updateProduct.middleware, ProductController.updateProduct.handler)

//Add products from 1C API endpoint
router.post('/add', ProductController.addProduct.middleware, ProductController.addProduct.handler)

// filesMiddleware.single('image'),
// router.post('/image', imagesMiddleware, ProductController.addImage.middleware, ProductController.addImage.handler)

// router.delete('/image', ProductController.delImage.middleware, ProductController.delImage.handler)

// router.delete('/:id', ProductController.delProduct.middleware, ProductController.delProduct.handler)

module.exports = router
