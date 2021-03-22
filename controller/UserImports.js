const { Router } = require('express');
const router = Router();
const UserImports = require('../model/UserImports');
const Workers = require('../model/worker');
const ProductPlacement = require('../model/productPlacement');
const Products = require('../model/products');
const Users = require('../model/users');
const jwt = require('jsonwebtoken');

router.post('/add-products', async (req, res) => {
    try{
        console.log('product----',req.body);
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info);
        const {productData, providerId} = req.body;
        for(i in productData){
            const product = await Products.findOne({where:{QRproduct: productData[i].QRProduct}, raw: true });
            console.log('product', product);
            if(!product){
                Products.create({
                    productName: productData[i].productName,
                    QRproduct: productData[i].QRProduct,
                    unit: productData[i].unit,
                    count: productData[i].count,
                    price: productData[i].price,
                    saleprice: productData[i].salePrice,
                    userId: info.userId,
                    providerId
                })
            }
            else{
                let prevCount = +product.count;
                let newCount = prevCount + +productData[i].count
                await Products.update({count: newCount}, {where: {QRproduct: productData[i].QRProduct} })
            }
            UserImports.create({
                productName: productData[i].productName,
                QRproduct: productData[i].QRProduct,
                unit: productData[i].unit,
                count: productData[i].count,
                price: productData[i].price,
                discount: productData[i].discount,
                total: productData[i].total,
                userId: info.userId,
                saleprice: productData[i].salePrice,
                providerId
            })
            .then(data => {
                console.log('new product------', data.dataValues);
                for(j in productData[i].productPlacement){
                    if(productData[i].productPlacement.length>0){
                        ProductPlacement.create({
                            productCount: productData[i].productPlacement[j].productCount,
                            productName: productData[i].productName,
                            QRproduct: productData[i].QRProduct,
                            status: false,
                            branchId: productData[i].productPlacement[j].branchId,
                            price: productData[i].price,
                            userId: info.userId,
                            userImportId: data.dataValues.id
                        })
                }
                else{
                    return;
                }
                }
            })
        }
        res.status(200).json({message: 'added'});
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

// router.get('/product-info/:id', async (req, res) => {
//     try{
//         console.log('mtav ste', req.params);
//         const token = req.headers['authorization'].replace('Bearer ','');
//         info = jwt.verify(token, 'jwtSecret');
//         console.log('info', info);
//         const worker = await Workers.findOne({where: {id: info.userId}});
//         console.log('worker', worker.dataValues);
//         const product = await Products.findOne(
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         )
//         console.log('Product', product.dataValues);
//         res.status(200).json(product)
//     }
//     catch{
//         res.status(500).json({ message: 'server error try again' });
//     }
// })

router.get('/my-products', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info.userId);
        console.log('params--------------', req.query.limit);
        const user = await Users.findOne({where: {id: info.userId}, raw: true});
        if(user){
            if(req.query.limit){
                var allProducts = await Products.findAll(
                    {
                        where: {userId: user.id}, 
                        limit: +req.query.limit,
                        offset: +req.query.offset
                    });
            }
            else{
                var allProducts = await Products.findAll(
                    {
                        where: {userId: user.id}, 
                    });
            }

            res.status(200).json(allProducts)
        }
        else{
            const worker = await Workers.findOne({where: {id: info.userId}, raw: true});
            const allProducts = await Products.findAll({
                where: {userId: worker.userId}, 
                limit: 1,
                offset: 2
            });
            res.status(200).json(allProducts)
        }
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/product-count', async (req, res) => {
    try{
        console.log('mtav ste', req.params);
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const user = await Users.findOne({where: {id: info.userId}, raw: true});
        if(user){
            const allProducts = await Products.findAll(
                {
                    where: {userId: user.id}, 
                });
            res.status(200).json(allProducts.length)
        }
        else{
            const worker = await Workers.findOne({where: {id: info.userId}, raw: true});
            const allProducts = await Products.findAll({
                where: {userId: worker.userId}, 
                limit: 1,
                offset: 2
            });
            res.status(200).json(allProducts)
        }
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
})



module.exports = router;