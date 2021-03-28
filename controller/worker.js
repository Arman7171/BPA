const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const workerMiddleware = require('../middleware/worker');
const Workers = require('../model/worker');
const Branches = require('../model/branch');
const Users = require('../model/users');
const ProductPlacements = require('../model/productPlacement');
const BranchProducts = require('../model/branchProducts');
const Products = require('../model/products');
const WorkerExports = require('../model/WorkerExports');
const bcrypt = require('bcryptjs');
const mailer = require('../email/nodemailer');

router.post('/add', 
    workerMiddleware,
    async (req, res) => {
    try{
        console.log('mtav');
        var hashedPassword;
        const token = req.headers['authorization'].replace('Bearer ','');
        const {fullName, birthDay, ssn, icn, rate, salary, mobile, email, password, branchId} = req.body;
        const branch = await Branches.findOne({where: {id: branchId}});
        console.log('branch', branch);
        if(password){
            hashedPassword = await bcrypt.hash(password, 12);
        }
        else{
            hashedPassword = '';
        }

        info = jwt.verify(token, 'jwtSecret');
        Workers.create({
            fullName, 
            birthDay, 
            ssn, 
            icn, 
            rate, 
            salary,
            mobile,
            branchAddres: branch.addres, 
            email: email ? email : '', 
            password: hashedPassword,
            userId: info.userId,
            branchId
        }).then((result) => {
            res.status(200).json(result);
        })


    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/my-workers',
        async (req, res) => {
        try{
            const token = req.headers['authorization'].replace('Bearer ','');
            info = jwt.verify(token, 'jwtSecret');
            const userWorkers = await Workers.findAll({where:{userId: info.userId}, raw: true });
            res.status(200).json(userWorkers);
        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
    }
);

router.delete('/delete/:id', 
async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('delete', req.body, info);
        console.log(req.params.id);
        let workerId = req.params.id;
            Workers.destroy({
                where: {
                id: workerId,
                }
            });
        
        res.status(200).json({message: 'worker deleted'});
    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
    }
);

router.get('/worker-info/:id',
        async (req, res) => {
        try{
            console.log('mtav');
            const token = req.headers['authorization'].replace('Bearer ','');
            info = jwt.verify(token, 'jwtSecret');
            let id = req.params.id;
            const userWorker = await Workers.findOne({where:{userId: info.userId, id}, raw: true });
            res.status(200).json(userWorker);
        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
    }
);

router.post('/import', async (req, res) => {
    const token = req.headers['authorization'].replace('Bearer ','');
    const {data} = req.body;
    console.log('worker import -----------------', data);
    info = jwt.verify(token, 'jwtSecret');
    const worker = await Workers.findOne({where:{id: info.userId}, raw: true });
    const user = await Users.findOne({where:{id: worker.userId}, raw: true });
    const branch = await Branches.findOne({where:{id: worker.branchId}, raw: true });
    
    for(i in data){
        const ProductPlacement = await ProductPlacements.findOne({where: {id: data[i].placementId}, raw: true});
        if(ProductPlacement.productCount == data[i].count){
            console.log('ProductPlacement--------', data[i].QRProduct);
            const BranchProduct = await BranchProducts.findOne({where: {QRproduct: data[i].QRProduct}, raw: true});
            console.log('BranchProduct-----', BranchProduct);
            if(BranchProduct){
                let prevCount = +BranchProduct.count;
                let newCount = prevCount + +data[i].count;
                await BranchProducts.update({count: newCount}, {where: {QRproduct: data[i].QRProduct} });
            }
            else{
                BranchProducts.create({
                    productName: data[i].productName,
                    QRproduct: data[i].QRProduct,
                    count: data[i].count,
                    userId: user.id,
                    branchId: worker.branchId
                })
            }
            await ProductPlacements.update({workerId:worker.id, status: 1}, {where: {id: data[i].placementId} })
            console.log('sax toshnia', user);
            const message = {
                to: user.email,
                subject: 'Ապրանքի մուտք մասնաճյուղ',
                html: `
                        <h3 style="color: green">Ապրանքը հաջողությամբ ավելացվեց</h3>
                        Աշխատողի Անունը: ${worker.fullName},
                        <br>
                        <br>
                        Ապրանքի Անունը: ${ProductPlacement.productName},
                        <br>
                        <br>
                        Ապրանքի QR-ը: ${ProductPlacement.QRproduct},
                        <br>
                        <br>
                        Ապրանքի Քանակը: ${data[i].count},
                        <br>
                        <br>
                        Մասնաճյուղ: ${branch.addres},
                        <br>
                        <br>
                        Ավելացման ամեսթիվը: ${new Date().toLocaleString()}
                        <hr><br>
                      `
              }
              mailer(message)
              res.status(200).json({message: 'product added'});
        }
        else{
            console.log('toshni chi');
            const message = {
                to: user.email,
                subject: 'Ապրանքի ՍԽԱԼ մուտք մասնաճյուղ',
                html: `
                        <h3 style="color: red">Ապրանքի մուտքի անհամապատասխանելիություն</h3>
                        Աշխատողի Անունը: ${worker.fullName},
                        <br>
                        <br>
                        Ապրանքի Անունը: ${ProductPlacement.productName},
                        <br>
                        <br>
                        Ապրանքի QR-ը: ${ProductPlacement.QRproduct},
                        <br>
                        <br>
                        Ապրանքի սպասող Քանակը: <span style="color: green">${ProductPlacement.productCount}</span>,
                        <br>
                        <br>
                        Ապրանքի մուտքագրված Քանակը: <span style="color: red">${data[i].count}</span>,
                        <br>
                        <br>
                        Մասնաճյուղ: ${branch.addres},
                        <br>
                        <br>
                        Ավելացման ամեսթիվը: ${new Date().toLocaleString()}
                        <hr><br>
                      `
              }
              mailer(message)
              res.status(400).json({message: 'product error'});
        }
    }

});

router.post('/productsExport', async (req, res) => {
    try{
    const token = req.headers['authorization'].replace('Bearer ','');
    const {data} = req.body;
    console.log('worker export -----------------', data);
    info = jwt.verify(token, 'jwtSecret');
    const worker = await Workers.findOne({where:{id: info.userId}, raw: true });
    const user = await Users.findOne({where:{id: worker.userId}, raw: true });
    for(i in data){
        WorkerExports.create({
            productName: data[i].productName,
            QRproduct: data[i].QRProduct,
            count: data[i].count,
            userId: user.id,
            workerId: worker.id,
            price: data[i].price
        })
        const BranchProduct = await BranchProducts.findOne({where: {QRproduct: data[i].QRProduct, userId: user.id}, raw: true});
        if(BranchProduct){
            let prevCount = +BranchProduct.count;
            let newCount = prevCount - +data[i].count;
            await BranchProducts.update({count: newCount}, {where: {QRproduct: data[i].QRProduct, userId: user.id} });
        }
        const Product = await Products.findOne({where: {QRproduct: data[i].QRProduct, userId: user.id}, raw: true});
        if(Product){
            prevCount = +Product.count;
            newCount = prevCount - +data[i].count;
            await Products.update({count: newCount}, {where: {QRproduct: data[i].QRProduct, userId: user.id} });
        }
        else{
            res.status(400).json({message: 'product exported'});
        }
        res.status(200).json({message: 'product exported'});
    }
}
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/worker-imports/:id', async (req, res) => {
    try{
        console.log('mtav');
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        let id = req.params.id;
        const workerImports = await ProductPlacements.findAll(
            {
                where:{userId: info.userId, workerId: id}, 
                raw: true,
                limit: 5,
                offset: 0 
            });
        res.status(200).json(workerImports);
    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/worker-lastImport/:id', async (req, res) => {
    try{
        console.log('mtav');
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        let id = req.params.id;
        const workerImports = await ProductPlacements.findAll(
            {
                where:{userId: info.userId, workerId: id}, 
                raw: true,
            });
        var index = workerImports[0];
        for(let i=1; i<workerImports.length; i++){
                if((new Date(workerImports[i].updatedAt)).getTime()>(new Date(index.updatedAt)).getTime()){
                    index=workerImports[i];
                }
        }
        console.log('index', index);
        res.status(200).json(index);
    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/worker-lastExport/:id', async (req, res) => {
    try{
        console.log('mtav');
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        let id = req.params.id;
        const workerExports = await WorkerExports.findAll(
            {
                where:{workerId: id}, 
                raw: true,
            });
        var index = workerExports[0];
        for(let i=1; i<workerExports.length; i++){
                if((new Date(workerExports[i].updatedAt)).getTime()>(new Date(index.updatedAt)).getTime()){
                    index=workerExports[i];
                }
        }
        console.log('poxos', index);
        res.status(200).json(index);
    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
});

router.get('/exports', async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        const month = req.query.month;
        const year = req.query.year;
        let monthExports = [];
        console.log('month, year------', month, year);
        const user = await Users.findOne({where: {id: info.userId}, raw: true});
            const workerExports = await WorkerExports.findAll(
                {
                    where: {userId: user.id}, 
                });
        for(let i=0; i<workerExports.length; i++){
            if(workerExports[i].createdAt.getMonth()==month && workerExports[i].createdAt.getFullYear()==year){
                monthExports.push(workerExports[i]);
            }
        }
            res.status(200).json(monthExports);
        }
    catch{
        res.status(500).json({ message: 'server error try again' });
    }
});



module.exports = router;