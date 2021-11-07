'use strict'

const express=require('express')
const router=express.Router()
const {userModel}=require('../models/index')
const bcrypt = require('bcrypt');
const base64 = require('base-64');
// const app=require('../server')
// const {db}=require('../models/index')

router.use(express.json());

router.use(express.urlencoded({ extended: true }));



router.post('/signup',signUpFunction)

async function signUpFunction(req,res) {
    try {
        console.log('---------tryyyy--',req.body);
        req.body.password=await bcrypt.hash(req.body.password, 5)

        let newUserName= await userModel.create({
            username : req.body.username,
            password: req.body.password
        });
        console.log('---------tryyyy22222--',req.body);
        res.json(newUserName)
        
    } 
    catch (error) {
        console.log('error in creating');
        console.log('-----------catch-------',req.body);
        
    }

    

    
}

module.exports=router