const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();
const registerRouter = require('./controller/auth');
const BranchRouter = require('./controller/branch');
const WorkerRouter = require('./controller/worker');
const sequelize = require("./config/db");

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const PORT = config.get('port') || 5000;

app.use('/worker', WorkerRouter);
app.use('/branch', BranchRouter);
app.use('/', registerRouter);

app.listen(PORT, async () => {
  try{
    await sequelize.sync().then(()=>{
      console.log('connect db');
    }); //{force: true}
    console.log(`server listen posrt ${PORT}`)
  }
  catch(e){
    console.log(e);
  }
})