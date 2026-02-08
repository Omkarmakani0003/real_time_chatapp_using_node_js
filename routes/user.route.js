const express = require('express');
const router = express.Router();
const RegistrationController = require('../controllers/registrationController')
const DashboardController = require('../controllers/DashboardController')
const LoginController = require('../controllers/LoginController')
const {UserValidation} = require('../utils/validator')
const {isAuth} = require('../middleware/isAuth')
const upload = require('../utils/fileUploads')



const checkLogin = (req,res,next)=>{
    const token = req.cookies.token
    if(token){
       return res.redirect('/dashboard')
    }else{
      next()
    }
}

router.get('/login',checkLogin,LoginController.loadLogin)
router.post('/user-login',checkLogin,LoginController.login)
router.get('/registration-form',checkLogin,RegistrationController.loadregister)
router.post('/register',checkLogin,upload.single('avatar'),UserValidation,RegistrationController.register)

router.use(isAuth)
router.get('/dashboard',DashboardController.dashboard)
router.post('/getuser',DashboardController.getuser)
router.post('/sendmessage',DashboardController.sendMessage)
router.get('/logout',LoginController.logout)


module.exports = router;
