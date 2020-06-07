
var app = require('express');
var nodemailer=require('nodemailer');
var dotenv=require('dotenv');
result=dotenv.config();






// mailer.extend(app, {
//   from: 'ayushpuri13@blog.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com'); 
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  
// });




// app.mailer.send('email', {
//     to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
//     subject: 'Test Email', // REQUIRED.
//     test:"Hello Wordl?",
//     html:"<br>Hello World</br>",
//     otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
//   }, function (err) {
//     if (err) {
//       // handle error
//       console.log(err);
//       res.status(401).json({"message":"There was an error sending the email"});
//       return;
//     }
//     res.status(200).json({"message":"Email Sent"});
//   });

// }


var out= {user:process.env.email,pass:process.env.password}
let transporter = nodemailer.createTransport({
      
        host: "mail.google.com",
        service:"Gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
           user: process.env.email, // generated ethereal user
           pass:process.env.password  // generated ethereal password
         },
        tls:{
            rejectUnauthorized:false
        }
      });

//////////-----------------------------------------nodemailer----------------------//

 // 

      // send mail with defined transport object
      

    module.exports=transporter;  
    
    

    
    






//---------------------------------------send mail----------------------//


// const sendmail = require('sendmail')();

// sendmail({
//   from: 'test@finra.org',
//   to: 'ayushpuri13@gmail.com',
//   subject: 'Hello World',
//   html: 'Mail of test sendmail '
// }, function (err, reply) {
//   if (err) res.status(400).json(err && err.stack)
//   if(reply) res.json(reply).status(200)
// })
