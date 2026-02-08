const {user} = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.loadregister = async(req,res) => {
   res.render('registration',{error: req.flash("errors"), oldInput: req.flash("oldInput")})
} 

exports.register = async(req,res) => {
   try{

      const errors = validationResult(req);
     
      if (!errors.isEmpty()) {
         req.flash("oldInput", req.body);
         errors.array().forEach((e) => {
            req.flash("errors", e);
         });
         return res.redirect("/registration-form");
      }
 
      const User = await user.findOne({ email : req.body.email });
      if(User){
         req.flash("oldInput", req.body);
         req.flash("errors", {path:"email",msg:'Email is already taken'})
         return res.redirect("/registration-form");
      }
      const HashPassword = await bcrypt.hash(req.body.password,10)
    
      if(!req.file){
         req.flash("oldInput", req.body);
         req.flash("errors", {path:"avatar"})
         return res.redirect("/registration-form");
      }

      const register = await user.create({
         fullName : req.body.fullName,
         email : req.body.email,
         avatar : req.file.filename,
         contact : req.body.contact,
         password : HashPassword,
      })

      if(!register){
         req.flash("errors", {message:`Registration failed`})
         return res.redirect("/user-register");
      }

      const token = jwt.sign(
         {id:register._id,email:register.email,name:register.fullName},
         process.env.JWTSECRET,
         {expiresIn:'1d'}
      )
      res.cookie('token',token,{
           httpOnly: true,
           secure: false,
           maxAge : 24 * 60 * 60 * 1000
      })
      req.flash("success", {message:`Registration successfully`})
      return res.redirect("/dashboard"); 

   }catch(error){
      console.error(error.message)
   } 
}