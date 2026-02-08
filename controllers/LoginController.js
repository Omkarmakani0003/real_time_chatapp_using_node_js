const {user} = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.loadLogin = async(req,res) => {
   res.render('login',{error : req.flash('errors'), oldInput : req.flash('oldInput')});
}

exports.login = async(req,res) => {

     try{
          const {email,password} = req.body;
    
          if(!email || !password){
             req.flash("oldInput", req.body);
             req.flash('errors',"Email and password are required")
             return res.redirect('/login')
          }
          const user_exist = await user.findOne({email})
          
          if(!user_exist){
             req.flash("oldInput", req.body);
             req.flash('errors',"Email or password incorrect")
             return res.redirect('/login')
          }

           const password_verify = await bcrypt.compare(password,user_exist.password)
  
           if(!password_verify){
             req.flash("oldInput", req.body);
             req.flash('errors',"Email or password incorrect")
             return res.redirect('/login')
           }
           const playload = {
               id: user_exist._id,
               name : user_exist.name,
               email : user_exist.email
           }

           const token = jwt.sign(playload,process.env.JWTSECRET,{expiresIn:'1d'})
           res.cookie('token', token, {
                                    httpOnly: true,
                                    secure: false,
                                    sameSite: 'lax',
                                    maxAge: 24 * 60 * 60 * 1000
                              })
           req.flash('success',"User login successfully")
           return res.redirect('/dashboard')
     }catch (e){
          console.log(e.message)
     }
}

exports.logout = (req,res) => {
    res.clearCookie('token')
    req.user = ''
    return res.redirect('/login') 
}