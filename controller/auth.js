const { Router } = require('express');
const router = Router();
const Users = require('../model/users');
const Worker = require('../model/worker');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');
const mailer = require('../email/nodemailer');

router.post('/register', 
    [
        check('email', 'email is not valid').isEmail(),
        check('password', 'min 6 simvol').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'register data is not valid'
                })
            }
            const { password, email } = req.body;
    
            const condidate = await Users.findOne({ where:{email}, raw: true  });
            console.log('condidate', condidate);
            if(!!condidate){
                return res.status(400).json({ message: 'Այս էլէկտրոնաին հասցեն զբաղված է' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 12);
            Users.create({
                name: req.body.name,
                lastname: req.body.lastName,
                email: req.body.email,
                companyname: req.body.companyName,
                password: hashedPassword,
                status: false
              })
              .then((res) => {
                  console.log('registre', res.dataValues.id);
                  const token = jwt.sign(
                    { userId: res.dataValues.id },
                    'jwtSecret',
                    {expiresIn: '1h'}
                );

                console.log(token);

                const message = {
                  to: req.body.email,
                  subject: 'Hello you are registration!',
                  html: `
                          <h3>You are successfully registred on our site</h3>
                          login: ${req.body.email},
                          password: ${req.body.password}
                          <hr><br>
                          <a href="http://localhost:3002/activate/` + token + `">Click here</a>
                        `
                }
                mailer(message)
              })
              

           
              return res.status(200).json({ message : 'Ակտիվացնելու համար հաստատեք Mail-ի նամակը' })
    
        }catch (e){
            res.status(500).json({ message: 'server error try again' })
        }
});

router.post('/login', 
    [
        check('email', 'email is not valid').normalizeEmail().isEmail(),
        check('password', 'write password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        var isMatch;
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'register data is not valid'
            })
        }
        const { email, password } = req.body;
        const user = await Users.findOne({where:{email}, raw: true });
        if(!user){
            const worker = await Worker.findOne({where:{email}, raw: true });
            console.log('worker', worker);
            if(!worker){
                return res.status(400).json(
                    {
                         message: 'Նման հաշիվ գոյություն չունի' ,      
                    });
            }
            else{
                 isMatch = await bcrypt.compare(password, worker.password);
                 if(!isMatch){
                    return res.status(400).json({ message: 'Սխալ գղթնաբառ' })
                }
                else{
                    const token = jwt.sign(
                        { userId: worker.id },
                        'jwtSecret',
                        {expiresIn: '10000h'}
                    );
            
                    console.log('asdasd', token);
            
                    res.json({ token, type: 'manager' })
                }
            }
        }
        else{
             isMatch = await bcrypt.compare(password, user.password);
             if(!isMatch){
                return res.status(400).json({ message: 'Սխալ գղթնաբառ' })
            }
            else{
                const token = jwt.sign(
                    { userId: user.id },
                    'jwtSecret',
                    {expiresIn: '10000h'}
                );
        
                console.log('asdasd', token);
        
                res.json({ token })
            }
        }

    }catch (e){
        res.status(500).json({ message: 'server error try again' })
    }
    
});

router.get('/activate/:tokenConfirm', 
    async (req, res) => {
    if(!req.params.tokenConfirm) {
        // return res.redirect('/login')
        return res.status(404).json({ error : "Not value tokenConfirm" });
      }
      const tokenConfirm = req.params.tokenConfirm;
      const info = jwt.verify(tokenConfirm, 'jwtSecret');
      console.log('info', info);
      const user = await Users.findOne({where:{id: info.userId}, raw: true });
      console.log('user activate', user);
      if(user){
        Users.update({ status: true }, {
            where: {id: info.userId}
          })
        return res.status(200).json({ message : 'Դուք բարեհաջող գրանցվեցիք' });
      }
      else{
        return res.status(404).json({ message : 'sxal token' });
      }

});

module.exports = router;