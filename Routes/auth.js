const express=require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
const Validators=require('../Middlewares/Validators')
const crypto=require('crypto');
const mailer=require('../Middlewares/mailer')




//-------------Controllers impor---////
var authController=require('../Controllers/authController.js')




//-----------------  jwt func ----------------//



function authenticateToken(req,res,next){
	var authHeaders=req.header('Authorization');
	var token=authHeaders.split(' ')[1];

	

	jwt.verify(token,'myjsonwebtoken',(err,decode)=>{
		if(err) return res.status(401).json(err.message);
		
		
		req.decode=decode;
		next();
	})
}


//---------------- Routes -----------------//


router.post('/login',Validators.login,authController.login);
router.post('/register',Validators.register,authController.register);


router.post('/change-password',authenticateToken,authController.changePassword);

router.post('/forgot-password',authController.forgotPassword);

router.post('/refresh-token',authController.refreshToken);
router.post('/send-verifyemail',authController.sendVerifyMail,mailer.sendMail);

module.exports=router;