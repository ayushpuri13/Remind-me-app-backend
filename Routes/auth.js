const express=require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
const Validators=require('../Middlewares/Validators')





//-------------Controllers impor---////
var authController=require('../Controllers/authController.js')




//-----------------  jwt func ----------------//



function authenticateToken(req,res,next){
	var authHeaders=req.header('Authorization');
	var token=authHeaders.split(' ')[1];

	

	jwt.verify(token,'myjsonwebtoken',err=>{
		console.log(err);
		if(err) return res.status(401);
		next();
	})
}


//---------------- Routes -----------------//


router.post('/login',Validators.login,authController.login);
router.post('/register',Validators.register,authController.register);


router.get('/change-password',authenticateToken,function(req,res){
	
	res.send('token auth');
});




module.exports=router;