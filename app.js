const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//View engine

app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use(express.static('public'));;


app.get('/',(req,res)=>{
    res.render('contact', {layout: false});
});

app.post('/send',(req,res)=>{
const output=`
<p>You have a new contact request</p>
<h3>Contact Details</h3>
<ul>
<li> Name: ${req.body.name}</li>
<li> Company: ${req.body.company}</li>
<li> Email: ${req.body.email}</li>
<li> Phone: ${req.body.phone}</li>
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>
`;

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: 'imap.gmail.com',
    port: 993,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'sarath.techie2040@gmail.com', // generated ethereal user
        pass: 'Sarath@123'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'sarath.techie2040@gmail.com', // sender address
      to: 'sarath.email2010@gmail.com', // list of receivers
      subject: 'Nodemailer test', // Subject line
      text: 'Testing Email for Nodemailer', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });



app.listen(3000,()=>
    console.log("Server running....")
);