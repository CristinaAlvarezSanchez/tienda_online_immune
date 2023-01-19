const router = require('express').Router();
const User = require('../../models/users.model');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('products')
        //const users = await User.find() - EL ID DE PRODUCTOS SALE COMO ID // con la de arriba sale el producto completo
        res.json(users)
    }
    catch (error) {
        res.json({ fatal: error.message })
    }
});
router.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).populate('products');
        res.json(user.products)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.get('/:userId/cart/add/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const user = await User.findById(userId);
        user.products.push(productId);
        await user.save();
        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }

})




router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;