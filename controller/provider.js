const { Router } = require('express');
const router = Router();
const Providers = require('../model/providers');
const jwt = require('jsonwebtoken');
const providerMiddleware = require('../middleware/provider');

router.post('/add', 
    providerMiddleware,
    async (req, res) =>{
        try{
            const token = req.headers['authorization'].replace('Bearer ','');
            const {providerName, addres, vat} = req.body;
            info = jwt.verify(token, 'jwtSecret');
            Providers.create({
                providerName,
                addres,
                vat,
                userId: info.userId
            })
            .then(data => {
                console.log('new provider------', data.dataValues);
                res.status(200).json(data.dataValues);
            })

        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
    }
);

router.get('/my-providers',
        async (req, res) => {
        try{
            const token = req.headers['authorization'].replace('Bearer ','');
            info = jwt.verify(token, 'jwtSecret');
            const companyProviders = await Providers.findAll({where:{userId: info.userId}, raw: true });
            res.status(200).json(companyProviders);
        }
        catch (e){
            res.status(500).json({ message: 'server error try again' });
        }
    }
)

router.delete('/delete/:id', 
async (req, res) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ','');
        info = jwt.verify(token, 'jwtSecret');
        console.log('delete', req.body, info);
        console.log(req.params.id);
        let providerId = req.params.id;
            Providers.destroy({
                where: {
                id: providerId,
                }
            });
        
        res.status(200).json({message: 'provider deleted'});
    }
    catch (e){
        res.status(500).json({ message: 'server error try again' });
    }
    }
)

module.exports = router;;