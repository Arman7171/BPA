const { Router } = require('express');
const router = Router();
const Branches = require('../model/branch');
const branchMiddle = require('../middleware/branch');
const jwt = require('jsonwebtoken');

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
)

router.get('/my-branches',
        async (req, res) => {
        try{
            const token = req.headers['authorization'].replace('Bearer ','');
            info = jwt.verify(token, 'jwtSecret');
            const userBranches = await Branches.findAll({where:{userId: info.userId}, raw: true });
            res.status(200).json(userBranches);
        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
    }
)

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
)

module.exports = router;