var mongoose=require('mongoose');



var Schema=mongoose.Schema;
var UserSchema=new Schema({

	first_name:{
	type:String
},

	last_name:{
	type:String
	
},


	email:{
	type:String
	
},
	
	password:{
	type:String
	
},
	
	contact:{
		type:Number
 }


});

var userModel=mongoose.model('userModel',UserSchema);

module.exports=userModel;