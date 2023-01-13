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
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "mail.traversymedia.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test@traversymedia.com', // generated ethereal user
      pass: '123abc', // generated ethereal password
    },
    tls:{
        rejectUnauthorised=false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Test" <test@traversymedia.com >', // sender address
    to: "sarath.email2010@gmail.com", // list of receivers
    subject: "Nodemailer 1 ✔", // Subject line
    text: "Hello ICTAK?", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 
  res.render('contact',{'Email is sent'});

main().catch(console.error);


app.listen(3000,()=>
    console.log("Server running....")
);