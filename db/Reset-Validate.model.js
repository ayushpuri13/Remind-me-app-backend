var mongoose=require('mongoose');



var Schema=mongoose.Schema;


//------------------------------reset- password -------//
var resetPasswordSchema=new Schema({

	
	email:{
	type:String
	
},
	
	token:{
	type:String
	
},
	
	expiry:{
		type:String
 }


});

exports.resetPasswordModel=mongoose.model('resetPasswordModel',resetPasswordSchema);


//------------------------validate-email---------------------//


var validateEmailSchema=new Schema({

	
	email:{
	type:String
	
},
	
	token:{
	type:String
	
},
	
	expiry:{
		type:String
 }


});

exports.validateEmailModel=mongoose.model('validateEmailModel',validateEmailSchema);

