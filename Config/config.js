var dotenv=require('dotenv');
result=dotenv.config({path:"./"});

exports.config=function(req,res){
	// console.log(result);
	// console.log(process.env.password,process.env.email)
	res.status(442);
}

// module.exports={
// 	password:process.env.password,
// 	email:process.env.email,
// 	secret_key:process.env.secret_key
// };