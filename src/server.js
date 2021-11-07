'use strict';


const express= require('express');
require('dotenv').config();
const app=express();
const userRouteIn=require('./routes/sign-in.route')
const userRouterUp=require('./routes/sign-up.route')
const PORT=process.env.PORT || 3060
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouteIn);
app.use(userRouterUp);

app.get('/',(req,res)=>{
  res.json('please check postman or thunder for checking heroku')
  
})
function start() {
  app.listen(PORT,()=>{
    console.log(`you are listining to this ${PORT}`);
  })
  
}

module.exports={
  app:app,
  start:start
}