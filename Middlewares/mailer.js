
var app = require('express')(),
    mailer = require('express-mailer');
 var nodemailer=require('nodemailer')





exports.sendMail=function sendMail(req,res,next){

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



//////////-----------------------------------------nodemailer----------------------//

 const output=`
    <p>Hello ${req.body.FullName}</p>
    <p> 1111 is your otp</p>
    `;

    let transporter = nodemailer.createTransport({
        host: "mail.google.com",
        service:"Gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        // auth: {
        //    user: 'ayushpuri13@gmail.com', // generated ethereal user
        //    pass: 'xruuzlgjujvmjtrk' // generated ethereal password
        //  },
        tls:{
            rejectUnauthorized:false
        }
      });
    
      // send mail with defined transport object
      let info = {
        from: '"Vayuz Technology" <ayush.vayuz@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Verificaion Mail", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

      transporter.sendMail(info, function(error, info){
        if(error)
          {res.status(404).json({"ERR":"mail error"})
            return console.log(error);}
            res.status(200).json({"message":"Email sent"})
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
    

    
    }






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
