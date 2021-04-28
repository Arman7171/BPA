const { Router } = require('express');
const router = Router();
const UserImports = require('../model/UserImports');
const Workers = require('../model/worker');
const ProductPlacement = require('../model/productPlacement');
const Products = require('../model/products');
const Users = require('../model/users');
const WorkerExports = require('../model/WorkerExports');
const BranchProducts = require('../model/branchProducts');
const Store = require('../model/store');
const jwt = require('jsonwebtoken');

router.post('/add-products', async (req, res) => {
    try{
        console.log('product----',req.body);
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info);
        var productPlacementCount = 0;
        const {productData, providerId} = req.body;
        for(i in productData){
            productPlacementCount = 0;
            for(j in productData[i].productPlacement){
                productPlacementCount += +productData[i].productPlacement[j].productCount;
            }
            const storeProduct = await Store.findOne({where:{QRproduct: productData[i].QRProduct, userId: info.userId}, raw: true });
            if(storeProduct){
                let prevCount = +storeProduct.count;
                let newCount = prevCount + +productData[i].count - +productPlacementCount;
                await Store.update({count: newCount}, {where: {QRproduct: productData[i].QRProduct, userId: info.userId} })
            }
            else{
                await Store.create({
                    productName: productData[i].productName,
                    QRproduct: productData[i].QRProduct,
                    unit: productData[i].unit,
                    count: +productData[i].count - +productPlacementCount,
                    price: productData[i].price,
                    userId: info.userId,

                })
            }
            console.log('productPlacementCount-----------', productPlacementCount);
            const product = await Products.findOne({where:{QRproduct: productData[i].QRProduct, userId: info.userId}, raw: true });
            console.log('product', product);
            if(!product){
                await Products.create({
                    productName: productData[i].productName,
                    QRproduct: productData[i].QRProduct,
                    unit: productData[i].unit,
                    count: productPlacementCount,
                    price: productData[i].price,
                    saleprice: productData[i].salePrice,
                    userId: info.userId,
                    providerId
                })
            }
            else{
                let prevCount = +product.count;
                let newCount = prevCount + +productPlacementCount;
                await Products.update({count: newCount}, {where: {QRproduct: productData[i].QRProduct} })
            }
            await UserImports.create({
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
            .then( async (data) => {
                console.log('new product------', data.dataValues);
                for(j in productData[i].productPlacement){
                    if(productData[i].productPlacement.length>0){
                        await ProductPlacement.create({
                            productCount: productData[i].productPlacement[j].productCount,
                            productName: data.dataValues.productName,
                            QRproduct: data.dataValues.QRproduct,
                            status: false,
                            branchId: productData[i].productPlacement[j].branchId,
                            price: data.dataValues.price,
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
        res.status(200).json({message: productPlacementCount});
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

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
});

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
});

router.get('/user-imports', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const month = req.query.month;
        const year = req.query.year;
        let monthImports = [];
        console.log('month, year------', month, year);
        const user = await Users.findOne({where: {id: info.userId}, raw: true});
            const userImports = await UserImports.findAll(
                {
                    where: {userId: user.id}, 
                });
        for(let i=0; i<userImports.length; i++){
            if(userImports[i].createdAt.getMonth()==month && userImports[i].createdAt.getFullYear()==year){
                monthImports.push(userImports[i]);
            }
        }
            res.status(200).json(monthImports);
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/user-income', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const month = req.query.month;
        const year = req.query.year;
        let imports = [];
        let exports = [];
        let importsChartData = [];
        let exportsChartData = [];
        let importsVal = 0;
        let lastImports = 0;
        let exportsVal = 0;
        let lastExports = 0;
        console.log('month, year------', month, year);
        const user = await Users.findOne({where: {id: info.userId}, raw: true});
        const userImports = await UserImports.findAll({where: {userId: user.id}});
        const Allexports = await WorkerExports.findAll({where:{userId:  user.id}, raw: true });
        for(let i=0; i<userImports.length; i++){
            if(userImports[i].createdAt.getMonth()==month && userImports[i].createdAt.getFullYear()==year){
                importsVal += userImports[i].count*userImports[i].price;
                imports.push(userImports[i]);
            }
            else if(userImports[i].createdAt.getMonth()==month-1 && userImports[i].createdAt.getFullYear()==year){
                lastImports += userImports[i].count*userImports[i].price;
            }
        }

        for(let i=0; i<Allexports.length; i++){
            if(Allexports[i].createdAt.getMonth()==month && Allexports[i].createdAt.getFullYear()==year){
                exportsVal += Allexports[i].count*Allexports[i].price;
                exports.push(Allexports[i]);
            }
            else if(Allexports[i].createdAt.getMonth()==month-1 && Allexports[i].createdAt.getFullYear()==year){
                lastExports += Allexports[i].count*Allexports[i].price;
            }
        }
        console.log('lastExports-lastImports-----------------------------', exportsVal-importsVal, lastExports-lastImports);
        let prcent = Math.abs((((exportsVal-importsVal) - (lastExports-lastImports))/(exportsVal-importsVal))*100);

        for(let i=0; i<imports.length; i++){
            let has = false;
            for(let j=0; j<importsChartData.length; j++){
                if(new Date(imports[i].createdAt).getDate() == new Date(importsChartData[j]?.createdAt).getDate()){
                    importsChartData[j].income+=imports[i].count*imports[i].price;
                    has=true;
                    break;
                }
            }
            if(!has){
                importsChartData.push({
                    createdAt: imports[i].createdAt,
                    income: imports[i].count*imports[i].price
                })
            }
        }

        
        for(let i=0; i<exports.length; i++){
            let has = false;
            for(let j=0; j<exportsChartData.length; j++){
                if(new Date(exports[i].createdAt).getDate() == new Date(exportsChartData[j]?.createdAt).getDate()){
                    exportsChartData[j].income+=exports[i].count*exports[i].price;
                    has=true;
                    break;
                }
            }
            if(!has){
                exportsChartData.push({
                    createdAt: exports[i].createdAt,
                    income: exports[i].count*exports[i].price
                })
            }
        }


            res.status(200).json({income: exportsVal-importsVal, lastIncome: lastExports-lastImports, imports, exports, prcent, importsChartData, exportsChartData});
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/top-selling-products', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const month = req.query.month;
        const year = req.query.year;
        let monthProductsSell = [];
        let lastMonthProductsSell = [];
        let sellPracent = [];
        console.log('month, year------', month, year);
        const workerExports = await WorkerExports.findAll({where: {userId: info.userId}, raw: true});
        for(let i=0; i<workerExports.length; i++){
            let has = false;
            if(workerExports[i].createdAt.getMonth()==month && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < monthProductsSell.length; j++) {
                   if(monthProductsSell[j].QRproduct == workerExports[i].QRproduct){
                    monthProductsSell[j].count+=workerExports[i].count;
                    has = true;
                    break;
                   }
                }
                if(!has){
                    monthProductsSell.push(workerExports[i]);
                }
            }
            else if(workerExports[i].createdAt.getMonth()==month-1 && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < lastMonthProductsSell.length; j++) {
                    if(lastMonthProductsSell[j].QRproduct == workerExports[i].QRproduct){
                     lastMonthProductsSell[j].count+=workerExports[i].count;
                     has = true;
                     break;
                    }
                 }
                 if(!has){
                     lastMonthProductsSell.push(workerExports[i]);
                 }
            }
        }
        for(let i=0; i<monthProductsSell.length; i++){
            let has = false;
            for(let j=0; j<lastMonthProductsSell.length; j++){
                if(monthProductsSell[i].QRproduct==lastMonthProductsSell[j].QRproduct){
                    var prcent = ((monthProductsSell[i].count-lastMonthProductsSell[j].count)/monthProductsSell[i].count)*100;
                    has = true;
                    break;
                }
            }
            if(!has){
                sellPracent.push({prcent: 100, name: monthProductsSell[i].productName});
            }
            else{
                sellPracent.push({prcent: Math.abs(prcent).toFixed(2), name: monthProductsSell[i].productName});
            }
        }
            res.status(200).json(sellPracent);
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/selling-products', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const month = req.query.month;
        const year = req.query.year;
        const branch = req.query.branch;
        var workerExports;
        let monthProductsSell = [];
        let lastMonthProductsSell = [];
        let sellPracent = [];
        console.log('month, year------', month, year);
        if(branch=='all'){
            workerExports = await WorkerExports.findAll({where: {userId: info.userId}, raw: true});
        }
        else{
            workerExports = await WorkerExports.findAll({where: {userId: info.userId, branchId: branch}, raw: true});
        }
        for(let i=0; i<workerExports.length; i++){
            let has = false;
            if(workerExports[i].createdAt.getMonth()==month && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < monthProductsSell.length; j++) {
                   if(monthProductsSell[j].QRproduct == workerExports[i].QRproduct){
                    monthProductsSell[j].count+=workerExports[i].count;
                    has = true;
                    break;
                   }
                }
                if(!has){
                    monthProductsSell.push(workerExports[i]);
                }
            }
            else if(workerExports[i].createdAt.getMonth()==month-1 && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < lastMonthProductsSell.length; j++) {
                    if(lastMonthProductsSell[j].QRproduct == workerExports[i].QRproduct){
                     lastMonthProductsSell[j].count+=workerExports[i].count;
                     has = true;
                     break;
                    }
                 }
                 if(!has){
                     lastMonthProductsSell.push(workerExports[i]);
                 }
            }
        }
        for(let i=0; i<monthProductsSell.length; i++){
            let has = false;
            for(let j=0; j<lastMonthProductsSell.length; j++){
                if(monthProductsSell[i].QRproduct==lastMonthProductsSell[j].QRproduct){
                    var prcent = ((monthProductsSell[i].count-lastMonthProductsSell[j].count)/monthProductsSell[i].count)*100;
                    has = true;
                    break;
                }
            }
            if(!has){
                sellPracent.push({prcent: 100, name: monthProductsSell[i].productName});
            }
            else{
                sellPracent.push({prcent: +Math.abs(prcent).toFixed(2), name: monthProductsSell[i].productName});
            }
        }
            res.status(200).json({sellPracent, monthProductsSell});
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/store-products', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('info', info.userId);
        console.log('params--------------', req.query.limit);
        const user = await Users.findOne({where: {id: info.userId}, raw: true});
        const ProductsCount = await Store.findAll(
            {
                where: {userId: user.id}, 
            });
            if(req.query.limit){
                var allProducts = await Store.findAll(
                    {
                        where: {userId: user.id}, 
                        limit: +req.query.limit,
                        offset: +req.query.offset
                    });
            }
            else{
                var allProducts = await Store.findAll(
                    {
                        where: {userId: user.id}, 
                    });
            }

            res.status(200).json({allProducts, ProductsCount: ProductsCount.length});
    }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.post('/import-in-store', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log(req.body);
        const { QRproduct, transverProduct, productName } = req.body
        const storeProduct = await Store.findOne({where:{QRproduct, userId: info.userId}, raw: true });
        const product = await Products.findOne({where:{QRproduct, userId: info.userId}, raw: true });
        var count = 0;
        for(let i=0; i<transverProduct.length; i++){
            count += +transverProduct[i].count;
            const BranchProduct = await BranchProducts.findOne({where:{QRproduct, userId: info.userId, branchId: transverProduct[i].branch}, raw: true });
            if(BranchProduct){
                await BranchProducts.update({count: +BranchProduct.count + +transverProduct[i].count}, {where: {QRproduct, userId: info.userId, branchId: transverProduct[i].branch} })
            }
            else{
                await BranchProducts.create({
                    productName,
                    QRproduct,
                    count: +transverProduct[i].count,
                    userId: info.userId,
                    branchId: transverProduct[i].branch
                })
            }
        }
        await Store.update({count: +storeProduct.count - +count}, {where: {QRproduct, userId: info.userId} })
        await Products.update({count: +product.count + +count}, {where:{QRproduct, userId: info.userId} })

        res.status(200).json(storeProduct);
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/products-selling-count', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const month = req.query.month;
        const year = req.query.year;
        var workerExports;
        let productsSell = [];
        let lastMonthProductsSell = [];
        let sellPracent = [];
        console.log('month, year------', month, year);

        var workerExports = await WorkerExports.findAll({where: {userId: info.userId}, raw: true});
        var products = await Products.findAll({ where: {userId: info.userId}, raw: true });

    for(let i=0; i<products.length; i++){
        products[i].countNow = products[i].count;
        products[i].count = 0;
        productsSell.push(products[i]);
    }

        for(let i=0; i<workerExports.length; i++){
            let has = false;
            if(workerExports[i].createdAt.getMonth()==month && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < productsSell.length; j++) {
                   if(productsSell[j].QRproduct == workerExports[i].QRproduct){
                    productsSell[j].count+=workerExports[i].count;
                    has = true;
                    break;
                   }
                }
                if(!has){
                    productsSell.push(workerExports[i]);
                }
            }
        }

        for (let j = 0; j < productsSell.length; j++) {
            productsSell[j].month1Count = 0;
            productsSell[j].month2Count = 0;
            productsSell[j].month3Count = 0;
         }

        for(let i=0; i<workerExports.length; i++){
            if(workerExports[i].createdAt.getMonth()==month-1 && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < productsSell.length; j++) {
                   if(productsSell[j].QRproduct == workerExports[i].QRproduct){
                    productsSell[j].month1Count+=workerExports[i].count;
                    }
                }
            }
        }

        for(let i=0; i<workerExports.length; i++){
            if(workerExports[i].createdAt.getMonth()==month-2 && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < productsSell.length; j++) {
                    if(productsSell[j].QRproduct == workerExports[i].QRproduct){
                        productsSell[j].month2Count+=workerExports[i].count;
                    }
                }
            }
        }

        for(let i=0; i<workerExports.length; i++){
            if(workerExports[i].createdAt.getMonth()==month-3 && workerExports[i].createdAt.getFullYear()==year){
                for (let j = 0; j < productsSell.length; j++) {
                    if(productsSell[j].QRproduct == workerExports[i].QRproduct){
                        productsSell[j].month3Count+=workerExports[i].count;
                    }
                }
            }
        }


            res.status(200).json(productsSell);
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});

module.exports = router;