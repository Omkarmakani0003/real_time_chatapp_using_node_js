const jwt = require('jsonwebtoken')
const {user} = require('../models/UserSchema')
const dotenv = require('dotenv')
dotenv.config()


exports.isAuth = async(req,res,next) => {
    const token = req.cookies.token
    
    if(!token){
        return res.redirect('/login')
    }

    try{
        const check = await jwt.verify(token,process.env.JWTSECRET)
        if(!check){
            req.flash('errors',"Unauthorized")
            return res.status(401).redirect('/login')
        }
        const User = await user.findById(check.id)
            if(!User){
                req.flash('errors',"User not found")
                return res.status(401).redirect('/login')
            }
        req.user = User
        next()
    }catch(error){
        if(error.message){
            res.clearCookie('token');
            req.user = ''
            return res.redirect('/login')
        }
    }

}
