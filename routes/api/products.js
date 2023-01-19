const router = require('express').Router();
const Product = require('../../models/products.model')

router.get('/', async (req, res) => {
    try {
        const result = await Product.find().populate('owner');
        res.json(result);
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/actives', async (req, res) => {
    try {
        const products = await Product.actives();  //estoy llamando al modelo que yo he creado. 
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params // ojito con restructuring
        //const result = await Product.find({ _id: productId });
        const result = await Product.findById(productId)
        res.json(result);
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await Product.create(req.body);
        res.json(result);
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await Product.findByIdAndUpdate(productId, req.body, { new: true }) //el tercer parámetro es para que devuelva el objeto editado. 
        res.json(result)
    }
    catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await Product.findByIdAndDelete(productId)
        res.json(result)
    }
    catch (error) {
        res.json({ fatal: error.message })
    }
});




module.exports = router;