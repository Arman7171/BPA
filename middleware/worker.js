const jwt = require('jsonwebtoken');
const Workers = require('../model/worker');
const Users = require('../model/users');

const workerMiddleware = async (req, res, next) => {
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
      console.log('info', info);
      const usersWorkers = await Workers.findAll({where:{userId: info.userId}, raw: true });
      const users = await Users.findAll({ raw: true });
      console.log('usersWorkers-------------------', usersWorkers);
      for(i in users){
        if(users[i].email == req.body.email){
          return res.status(400).json({ error: 'Էլեկրոնային հասցեն զբաղված է'});
        }
      }
      for(i in usersWorkers){
        if(usersWorkers[i].email == req.body.email){
          return res.status(400).json({ error: 'Էլեկրոնային հասցեն զբաղված է'});
        }
          if(usersWorkers[i].ssn == req.body.ssn){
            return res.status(400).json({ error: 'Այս Աշխատողր արդեն գրանցված է'});
          }
      }

    next();
}

module.exports = workerMiddleware;