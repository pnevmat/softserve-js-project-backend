const express = require('express')
const productRouter = require('./routes/product')
// import basketRouter from './routes/basket'
// import productRequest from './routes/productRequest'

const router = express.Router()

router.use('/product', productRouter)
// router.use('/basket', basketRouter)
// router.use('/product-request', productRequest)

router.get('/', (_, res) => {
    res.send('Backend API')
})

module.exports = router
