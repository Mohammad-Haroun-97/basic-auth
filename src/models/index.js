'use strict'

// require('dotenv').config();
const {Sequelize,DataTypes}=require('sequelize')
const user=require('./user.model')


const POSTGRES_URL=process.env.NODE_ENV=== 'test' ? "sqlite:memory:" :process.env.DATABASE_URL

let squelizeOptions=process.env.NODE_ENV==='production'? {

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }


}:{}

let sequelize=new Sequelize(POSTGRES_URL,squelizeOptions)



const userModel=user(sequelize,DataTypes)

module.exports={

  db: sequelize,
  userModel:userModel
}
