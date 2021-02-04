const { Router } = require('express');
const router = Router();
const Products = require('../model/products');
const Workers = require('../model/worker');
const ProductPlacement = require('../model/productPlacement');
const jwt = require('jsonwebtoken');

router.post('/add-products', async (req, res) => {
    try{
        console.log('product----',req.body);
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info);
        const {productData, providerId} = req.body;
        for(i in productData){
            Products.create({
                productName: productData[i].productName,
                unit: productData[i].unit,
                count: productData[i].count,
                price: productData[i].price,
                discount: productData[i].discount,
                total: productData[i].total,
                status: productData[i].status,
                userId: info.userId,
                providerId
            })
            .then(data => {
                console.log('new product------', data.dataValues);
                res.status(200).json(data.dataValues);
                for(j in productData[i].productPlacement){
                    ProductPlacement.create({
                        productCount: productData[i].productPlacement[j].productCount,
                        productName: productData[i].productName,
                        status: false,
                        branchId: productData[i].productPlacement[j].branchId,
                        providerId,
                        userId: info.userId,
                        productId: data.dataValues.id
                    })
                }
            })
        }
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
})

router.get('/mybranch-products', async (req, res) => {
    try{
        console.log('mtav');
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info);
        const worker = await Workers.findOne({where: {id: info.userId}});
        console.log('worker', worker.dataValues);
        const productPlacement = await ProductPlacement.findAll(
            {
                where: {
                    branchId: worker.dataValues.branchId,
                    status: false,
                    userId: worker.dataValues.userId
                }
            })
        console.log('productPlacement', productPlacement[0].dataValues);
        res.status(200).json(productPlacement)
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
})

router.get('/product-info/:id', async (req, res) => {
    try{
        console.log('mtav ste', req.params);
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info);
        const worker = await Workers.findOne({where: {id: info.userId}});
        console.log('worker', worker.dataValues);
        const product = await Products.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        console.log('Product', product.dataValues);
        res.status(200).json(product)
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
})



module.exports = router;