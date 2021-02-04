const jwt = require('jsonwebtoken');
const Branches = require('../model/branch');

const branchMiddleware = async (req, res, next) => {
    let info;
    console.log('---------', req.body);

    if (!req.headers['authorization']) {
        return res.status(400).json({ error: 'Token is absent'})
      }
      const token = req.headers['authorization'].replace('Bearer ','');
      
      try {
        info = jwt.verify(token, 'jwtSecret');
      } catch (err) {
        return res.status(400).json({ error: 'Token is not valid'})
      }

      const userBranches = await Branches.findAll({where:{branchName: req.body.branchName}, raw: true });
      console.log('userBranches-------------------', userBranches);
      for(i in userBranches){
          if(userBranches[i].branchName === req.body.branchName){
            return res.status(400).json({ error: 'Այս անունով մասնաճուղ առկա է'});
          }
      }

    next();
}

module.exports = branchMiddleware;