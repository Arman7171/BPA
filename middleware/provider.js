const jwt = require('jsonwebtoken');
const Providers = require('../model/providers');

const providerMiddleware = async (req, res, next) => {
    let info;

    if (!req.headers['authorization']) {
        return res.status(400).json({ error: 'Token is absent'})
      }
      const token = req.headers['authorization'].replace('Bearer ','');
      
      try {
        info = jwt.verify(token, 'jwtSecret');
      } catch (err) {
        return res.status(400).json({ error: 'Token is not valid'})
      }

      const comapnyProvider = await Providers.findAll({ raw: true });
      console.log('comapnyProvider-------------------', comapnyProvider);
      for(i in comapnyProvider){
          if(comapnyProvider[i].vat == req.body.vat){
            return res.status(400).json({ error: 'Նման մատակարար գրանցված է'});
          }
      }

    next();
}

module.exports = providerMiddleware;