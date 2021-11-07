'use strict'

const express=require('express')
const router=express.Router()
const {auth}=require('../middleware/basicAuth')




router.post('/signin',auth, signInFunction)

async function signInFunction(req,res) {
  console.log('functiffffffffffffon');
  
  res.status(200).json(req.userInfo);

   
}

module.exports=router