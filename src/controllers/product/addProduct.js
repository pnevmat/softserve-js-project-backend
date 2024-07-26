const yup = require('yup')
const { SendError, SendResponse } = require('../../helpers')
const { controllerWrapper, validation } = require('../../middlewares')
const ProductService = require('../../services/ProductService')

// id: '1',
// name: 'Crater-G',
// brand: 'NASA',
// price: 8.99,
// inStock: 3,
// img: getImgPath('products', 'carterG.jpg', 'product'),
// imgSet: [
// 	getImgPath('products', 'carterG1.jpg', 'product'),
// 	getImgPath('products', 'carterG2.jpg', 'product'),
// 	getImgPath('products', 'carterG3.jpg', 'product'),
// 	getImgPath('products', 'carterG4.jpg', 'product'),
// 	getImgPath('products', 'carterG5.jpg', 'product'),
// 	getImgPath('products', 'carterG6.jpg', 'product'),
// ],
// category: 'shoes',
// subcategory: 'women',
// subsubcategory: 'sandals',
// size: [{ size: '1' }],
// width: [{ width: 'm' }],
// color: [
// 	{
// 		color: 'white',
// 		img: getImgPath('products', 'carterGWhite.jpg', 'product'),
// 	},
// ],
// style: 'comfort',
// occasion: 'casual',
// feature: 'strappy',
// material: 'manmade',
// pattern: 'solid',
// theme: 'action sports',
// accent: 'buckle',
// description: [
// 	'Perfect for the beach or lounging around the house, the NASA Crater-G will ensure your day is filled with lightweight comfort.',
// 	'SKU: #9694810',
// 	'Slip-on sandal with open rounded toe and open back for easy on and off.',
// 	'Single wide band emblazoned with NASA logo.',
// 	'Polyurethane upper and lining.',
// 	'PVC footbed and sole.',
// 	'Imported.',
// 	'Weight of footwear is based on a single item, not a pair.',
// 	'Measurements: Weight: 2.4 oz.',
// ]

const schema = yup.object().shape({
    name: yup.string().required(),
    brand: yup.string().required(),
    price: yup.number().required(),
    inStock: yup.number().required(),
    category: yup.string().required(),
    subcategory: yup.string(),
    subsubcategory: yup.number().required(),
    size: yup.array().of(
        yup.object().shape({
            size: yup.string().required(),
        }),
    ),
    width: yup.array().of(
        yup.object().shape({
            width: yup.string().required(),
        }),
    ),
    color: yup.array().of(
        yup.object().shape({
            color: yup.string().required(),
        }),
    ),
    style: yup.string().required(),
    occasion: yup.string().required(),
    feature: yup.string().required(),
    material: yup.string().required(),
    pattern: yup.string().required(),
    theme: yup.string().required(),
    accent: yup.string().required(),
    description: yup.array().of(yup.string().required()),
})

const addProduct = async (req, res) => {
    const { product } = req.body

    if (!product) return SendError.BAD_REQUEST(res, 'Помилка додавання')

    await ProductService.createProducts(product)

    return SendResponse.OK(res, 'Продукт додано', {})
}

module.exports = {
    middleware: [validation(schema)],
    handler: controllerWrapper(addProduct),
}
