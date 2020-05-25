var UserModel=require('../db/User.model.js');

const jwt =require('jsonwebtoken');



//----------- jwt generate token -------////
function generateToken(email){

var token=jwt.sign({email:email},'myjsonwebtoken',{expiresIn:'1h'});
return token;

}


//------------------------------------------------- Controls ------------//


//-------------- Login ------------//


exports.login=function(req,res){
 	 
UserModel.find({'email':req.body.email},function(err,user){
if(err) res.status(400).json(err);
console.log(user);

if(!user.length==0){
	
if(user.password==req.body.password){
	const token=generateToken(req.body.email);
	res.json(token);
}
else
{
	res.status(400).json({"message":'Invalid password'});
}

}
else{
res.status(400).json({"message":"User not found or invalid email"});
}
})
}


//-----------------------register---------//


exports.register=function(req,res){
UserModel.create({
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		email:req.body.email,
		password:req.body.password,
		contact:req.body.contact
	},function(err,user){
		
	if(user) res.json(user).status(200);
	if(err) res.json(err).status(400);
	
	

	})


}