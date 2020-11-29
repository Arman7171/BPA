const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const workerMiddleware = require('../middleware/worker');
const Workers = require('../model/worker');
const bcrypt = require('bcryptjs');

router.post('/add', 
    workerMiddleware,
    async (req, res) => {
    try{
        console.log('mtav');
        const token = req.headers['authorization'].replace('Bearer ','');
        const {fullName, birthDay, ssn, icn, rate, salary, email, password, branchId} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        info = jwt.verify(token, 'jwtSecret');
        Workers.create({
            fullName, 
            birthDay, 
            ssn, 
            icn, 
            rate, 
            salary, 
            email, 
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
)

module.exports = router;