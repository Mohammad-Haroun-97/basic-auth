'use strict'

const app=require('./src/server')
const {db}=require('./src/models/index')
// require('dotenv').config();
// const DB: any = db;
// const { User } = DB;


db.sync().then(()=>{
    app.start()
})


