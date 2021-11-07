'use strict'

const express = require('express');
const  {userModel}  = require('../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const userRouter = express.Router();
userRouter.use(express.urlencoded({ extended: true }));
 const auth  =(async(req, res) => {
 let basicHeaderParts = req.headers.authorization.split(' ');
      let encodedString = basicHeaderParts.pop();
      let decodedString = base64.decode(encodedString);
      let [username, password] = decodedString.split(':');
      try {
        const user = await userModel.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
          res.status(200).json(user);
          console.log('this working ',user)
        }
        else {
          throw new Error('Invalid User')
        }
 } catch (error) { res.status(403).send("Invalid Login"); }
})
module.exports ={auth}






// const bcrypt = require("bcrypt");
// const base64 = require("base-64");

// const {user} = require("../models/index");

// const basicAuth = async (req, res, next) => {

//   if (req.headers["authorization"]) {
//     let basicHeaderParts = req.headers.authorization.split(" ");
//     let encoded = basicHeaderParts.pop();
//     let decoded = base64.decode(encoded);
//     let [username, password] = decoded.split(":");
//     try {
//         console.log("try");
//       console.log(user.findAll());
//       const userInfo = await user.findOne({ where: { username: username } });
//       const valid = await bcrypt.compare(password, userInfo.password);
//       if (valid) {
//         console.log("vlid");
//         res.status(200).json({
//           username: username,
//           id: userInfo.id,
//           password:password
//         });
//         next();
//       } else {
//         throw new Error("Invalid UserName and Password");
//       }
//     } catch (error) {
//         console.log("baaaaaaaaaad");
//       console.log(error);
//       res.status(403).send("error in signin");
//     }
//   }
// };

// module.exports = {basicAuth};