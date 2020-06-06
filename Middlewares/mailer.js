
var app = require('express')(),
    mailer = require('express-mailer');
 





exports.sendMail=function sendMail(req,res,next){

mailer.extend(app, {
  from: 'ayushpuri13@blog.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com'); 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  
});




app.mailer.send('email', {
    to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Test Email', // REQUIRED.
    test:"Hello Wordl?",
    html:"<br>Hello World</br>",
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.status(401).json({"message":"There was an error sending the email"});
      return;
    }
    res.status(200).json({"message":"Email Sent"});
  });

}



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
