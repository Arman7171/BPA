const { Router } = require('express');
const router = Router();
const Branches = require('../model/branch');
const Workers = require('../model/worker');
const ProductPlacements = require('../model/productPlacement');
const Products = require('../model/products');
const WorkerExports = require('../model/WorkerExports');
const branchMiddle = require('../middleware/branch');
const jwt = require('jsonwebtoken');
const BranchProducts = require('../model/branchProducts');

router.post('/add',
    branchMiddle,
    (req, res) => {
        try{
            const token = req.headers['authorization'].replace('Bearer ','');
            const {branchName, addres, vat} = req.body;
            info = jwt.verify(token, 'jwtSecret');
            Branches.create({
                branchName,
                addres,
                vat,
                userId: info.userId
            })
            .then(data => {
                console.log('new branch------', data.dataValues);
                res.status(200).json(data.dataValues);
            })

        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
        
    }
);

router.get('/my-branches',
        async (req, res) => {
            console.log('mtav------=========');
        try{
            console.log(req.headers);
            const token = req.headers['authorization'].replace('Bearer ','');
            info = jwt.verify(token, 'jwtSecret');
            const userBranches = await Branches.findAll({where:{userId: info.userId}, raw: true });
            res.status(200).json(userBranches);
        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
    }
);

router.patch('/delete', 
async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('delete', req.body, info);
        let chackedBranches = req.body;
        for(i in chackedBranches){
            console.log('--------------', chackedBranches[i]);
            Branches.destroy({
            where: {
              id: chackedBranches[i],
              userId: info.userId
            }
            })
        }
        res.status(200).json({message: 'breanches deleted'});
    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
    }
);

router.get('/branche-workers/:id',
        async (req, res) => {
            console.log('mtav------=========', req.params.id);
            try{
                console.log(req.headers);
                const token = req.headers['authorization'].replace('Bearer ','');
                info = jwt.verify(token, 'jwtSecret');
                const branchWorkers = await Workers.findAll({where:{userId: info.userId, branchId: req.params.id}, raw: true });
                res.status(200).json(branchWorkers);
            }
            catch (e){
                res.status(500).json({ message: 'server error try again' });
            }
    }
);

router.get('/branche-imports/:id',
        async (req, res) => {
            console.log('mtav------=========', req.params.id);
            try{
                const token = req.headers['authorization'].replace('Bearer ','');
                info = jwt.verify(token, 'jwtSecret');
                const imports = await ProductPlacements.findAll({where:{status: 1, branchId: req.params.id}, raw: true });
                let monthImports = 0;
                let prevMonthImports = 0;
                let percent = 0;
                for(i in imports){
                    if(new Date().getMonth() === imports[i].updatedAt.getMonth()){
                        monthImports += imports[i].productCount*imports[i].price;
                    }
                    else if(new Date().getMonth()-1 === imports[i].updatedAt.getMonth()){
                        prevMonthImports += imports[i].productCount*imports[i].price;
                    }
                }
                percent = ((monthImports - prevMonthImports)/monthImports)*100;
                res.status(200).json({imports, monthImports, percent, prevMonthImports});
            }
            catch (e){
                res.status(500).json({ message: 'server error try again' });
            }
    }
);

router.get('/branche-exports/:id',
        async (req, res) => {
            console.log('mtav------=========', req.params.id);
            try{
                const token = req.headers['authorization'].replace('Bearer ','');
                info = jwt.verify(token, 'jwtSecret');
                const exports = await WorkerExports.findAll({where:{userId: info.userId}, raw: true });
                console.log('exports', exports);
                let monthExports = 0;
                let prevMonthExports = 0;
                let percent = 0;
                for(i in exports){
                    if(new Date().getMonth() === exports[i].createdAt.getMonth()){
                        monthExports += exports[i].count*exports[i].price;
                    }
                    else if(new Date().getMonth()-1 === exports[i].createdAt.getMonth()){
                        prevMonthExports += exports[i].count*exports[i].price;
                    }
                }
                percent = ((monthExports - prevMonthExports)/monthExports)*100;
                res.status(200).json({exports, monthExports, percent, prevMonthExports});
            }
            catch (e){
                res.status(500).json({ message: 'server error try again' });
            }
    }
);

router.get('/branche-products',
        async (req, res) => {
            console.log('mtav------=========', req.params.id);
            try{
                const token = req.headers['authorization'].replace('Bearer ','');
                info = jwt.verify(token, 'jwtSecret');
                console.log('info', info.userId);
                console.log('params--------------', req.query.limit);
                const user = await Users.findOne({where: {id: info.userId}, raw: true});
                console.log('user-=--=-=-=-=-=', user);
                    if(req.query.limit){
                        var allProducts = await BranchProducts.findAll(
                            {
                                where: {userId: user.id}, 
                                limit: +req.query.limit,
                                offset: +req.query.offset
                            });
                    }
                    else{
                        var allProducts = await BranchProducts.findAll(
                            {
                                where: {userId: user.id}, 
                            });
                    }
        
                    res.status(200).json(allProducts);
            }
            catch{
                res.status(500).json({ message: 'server error try again' });
            }
    }
);


module.exports = router;