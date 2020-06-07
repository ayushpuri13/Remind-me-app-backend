var UserModel=require('../db/User.model.js');
var ResetValidateModel=require('../db/Reset-Validate.model');
const ResetPassword=ResetValidateModel.resetPasswordModel;
const ValidateEmailModel=ResetValidateModel.validateEmailModel;
const jwt =require('jsonwebtoken');
 const transporter=require('../Middlewares/mailer')
const moment =require('moment');
const crypto=require('crypto');
var dotenv=require('dotenv');
result=dotenv.config({path:"../"});
 var nodemailer=require('nodemailer');

//----------- jwt generate token -------////
function generateToken(email){

 var token=jwt.sign({email:email},process.env.secret_key,{expiresIn:'1h'});
 return token;

}


//------------------------------------------------- Controls ------------//


//-------------- Login ------------//


exports.login=function(req,res){
 	 
UserModel.find({'email':req.body.email},function(err,user){
if(err) res.status(400).json(err);

if(!user.length==0)
   {
  
	
      if(user[0].password==req.body.password)
        {//if user exists send token
	         const token=
            {
              refresh:jwt.sign({email:req.body.email},process.env.secret_key,{expiresIn:'1d'}),
              access:jwt.sign({email:req.body.email},process.env.secret_key,{expiresIn:'1h'})
             };
           user=user[0];
	         res.json({user,token});
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


//-----------------------register new  user----------------------------------------------//


exports.register=function(req,res){

UserModel.find({'email':req.body.email},function(err,user)
 {
   
   //check if user already exixts

   if(!user.length==0 && !user[0].isVerified) {res.status(403).json({"Error":"Email already registered but not verified"})};

   if(!user.length==0) {res.status(400).json({"Error":"Email already registered"})};

//creating user if not exists


   UserModel.create(
    {
  	 first_name:req.body.first_name,
		 last_name:req.body.last_name,
		 email:req.body.email,
		 password:req.body.password,
		 contact:req.body.contact,
		 isVerified:false
	},
   function(err,user){
		
        const token={
              refresh:jwt.sign({email:req.body.email},process.env.secret_key,{expiresIn:'1d'}),
              access:jwt.sign({email:req.body.email},process.env.secret_key,{expiresIn:'1h'})
              };
        if(err) res.json(err).status(400);

        if(user)
           {
           //create validate email token and saving in database
             ValidateEmailModel.create({
              email:req.body.email,
              token:crypto.randomBytes(32).toString('hex'),
              expiry:moment.utc().add('seconds')
               },
                 function(err,newresetpass){
                         if(err) res.json({Error:'Failed'}).status(400);
                         if(newresetpass)
                          {
                             console.log(newresetpass);         
                   
 ///-----------send verify email on registration if user does not exists -----

const output=`
     <p>Hello ${req.body.first_name}</p>
     <p> please verify your email by using this link</p>
     <p>https://auth.com/?action=verify&token=${newresetpass.token} </p>
    `;

let info = {
        from: '"Authentication App" <no-reply@auth.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Verificaion Mail", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

transporter.sendMail(info, function(error, info){
       console.log(transporter);  
        if(error)
          {res.status(404).json({"ERR":"mail error"})
            return console.log(error);}
            res.status(201).json({"message":"Email sent",token,user})
      });

           
 }
});
	 
	
	}
	

	})
})
}


//----------------------- change password----------------//

exports.changePassword=function(req,res){
 	


UserModel.find({'email':req.decode.email},function(err,user){
if(err) res.status(400).json(err);


if(!user.length==0)
    {
	
       if(user[0].password==req.body['current-password'])
           {
	            user[0].password=req.body['new-password'];
              user[0].save(function(err,user){
	            console.log(err);
	       
	            if(user)
	                {
		                res.status(204).json({"message":"Password Updated"});
	                }
	
                })
           }
       

       else
          {
	            res.status(400).json({"message":'Invalid password'});
          }

    }

else
   {
       res.status(400).json({"message":"User not found or invalid email"});
   }
})
}


//---------------------forgot passord ------------------//




exports.forgotPassword=function(req,res){

UserModel.find({'email':req.body.email},function(err,user)
 {
  	if(err) res.status(400).json({Error:'User does not exist'});

	  if(!user.length==0)
       {
           //---destroys previous token if exists

            ResetPassword.find({'email':req.body.email},function(err,resetpass){
            if(resetpass){
 	          if(!resetpass.length==0){
	          resetpass[0].destroy,function(err){
		        console.log(err);
          }
        }
         //creates new token

         ResetPassword.create({
	        email:req.body.email,
	        token:crypto.randomBytes(32).toString('hex'),
	        expiry:moment().add(4,'h')
          },function(err,newresetpass){
	          if(err) res.json({Error:'Failed'}).status(400);
	          if(newresetpass){
		          console.log(newresetpass);
              console.log(moment().isBefore(newresetpass.expiry))

//-------------send mail------//

const output=`
     <p>Hello ${user[0].first_name}</p>
     <p> To reset your password click on the following link</p>
     <p>https://auth.com/?action=reset&token=${newresetpass.token} </p>
    `;

let info = {
        from: '"Authentication App" <no-reply@auth.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Reset password Mail", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

transporter.sendMail(info, function(error, info){
        
        if(error)
          {res.status(404).json({"ERR":"mail error"})
            return console.log(error);}
            res.status(200).json({"message":"Email sent"})
      });





	}
})
};

})

	}
})
}
//--------------------------reset password-------//

exports.resetPassword=function(req,res){

 ResetPassword.find({token:req.body.token},function(err,user){
 if(err) res.status(400);


//checks if token exists
	
 if(!user.length==0)
  {
    //checks expiry of token
   if(moment().isBefore(moment(user[0].expiry))){


      user=user[0];
      UserModel.find({'email':user.email},function(err,userinfo){
      if(!userinfo.length==0)
        
        //finds email and reset the password

        {
           userinfo[0].password=req.body['new-password'];
           userinfo[0].save(function(err,updatedpass){
	            if(err) res.status(400).json({"Error":"Reset Password Failed"});
	            console.log(err)
              if(updatedpass)
	             {
		             res.status(204).json({"message":"Password"})
	             }
              })
          }
       })

     }

    else {res.status(401).json({"Error":"Token Expired"});}
  }
else
 {
	res.status(401).json({"Error":"Invalid Token"});
 }

})

}

//-------------------Validate Email----------------//

exports.validateEmail=function(req,res)
 {

   //checks if token exists
  ValidateEmailModel.find({token:req.body.token},function(err,token){
  	if(err) res.status(400);
  	if(!token.length==0)
  	  {
        console.log(moment().utc().isBefore(moment.utc(token[0].expiry)),moment(),moment(token[0].expiry),token[0].expiry);
        //checks expiry of token
       if(moment().isBefore(moment(token[0].expiry))){
        
      //makes user verified

         UserModel.find({email:token[0].email},function(err,user){
            if(err) res.status(400);
            if(!user.length==0)
             {
               user[0].isVerified=true;
               user[0].save(function(err,usersaved){
               	if(usersaved)
               	 {
                   res.status(200).json({"message":"User Verified",usersaved});
              	 }
              })
            }
        })
       }
       else{ res.status(401).json({"Error":"Token Expired"}); }
  	  }
    else
     {
       res.status(401).json({"Error":"Invalid Token"});
      }

  })
 }
//------------------------refresh token ------------------//

exports.refreshToken=function(req,res){
var authHeaders=req.body.refresh;
  var token=authHeaders;

  
//checks token authentication

  jwt.verify(token,process.env.secret_key,(err,decode)=>{
    if(err) return res.status(401).json(err.message);
    console.log(decode.email)
    
    req.decode=decode;
    })
  if(req.decode){
    
    //sending token if user exists

     UserModel.find({'email':req.decode.email},function(err,user){
       if(err) res.status(400).json(err);

       if(!user.length==0)
        {
           let token=
           {
             refresh:jwt.sign({email:user[0].email},process.env.secret_key,{expiresIn:'1d'}),
             access:jwt.sign({email:user[0].email},process.env.secret_key,{expiresIn:'1h'})
            }
           res.status(200).json(token);
        }

  })
}}


//-----------------------------send verify mail-------------------------//

exports.sendVerifyMail=function(req,res,next){

UserModel.find({'email':req.body.email},function(err,user)
  {
     if(err) res.status(400).json({Error:'User does not exist'});

     if(!user.length==0){
      
       //checks and destroys if token exists

        ValidateEmailModel.find({'email':req.body.email},function(err,resetpass){
        if(!resetpass.length==0)
         {
           resetpass[0].destroy,function(err){
            console.log(err);
             }
          }
      
        //creating new token to send mail

        ValidateEmailModel.create({
         email:req.body.email,
         token:crypto.randomBytes(32).toString('hex'),
         expiry:moment().add(4,'h')
        },function(err,newresetpass){
           if(err) res.json({Error:'Failed'}).status(400);
           if(newresetpass){

    
//--------------------------send email-----//

    const output=`
     <p>Hello ${user[0].first_name}</p>
     <p> please verify your email by using this link</p>
     <p>https://auth.com/?action=verify&token=${newresetpass.token} </p>
    `;

let info = {
        from: '"Authentication App" <no-reply@auth.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Verificaion Mail", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

transporter.sendMail(info, function(error, info){
       console.log(transporter);  
        if(error)
          {res.status(404).json({"ERR":"mail error"})
            return console.log(error);}
            res.status(200).json({"message":"Email sent"})
      });                        
  }
})
})
}})
}


