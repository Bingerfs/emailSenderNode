var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
   function enviar(correo, asunto, telefono, nombre){
       const output=`
       <p>Tiene una nueva solicitud de contacto</p>
       <h3>Detalles de contacto</h3>
       <ul>  
         <li>Nombre: ${nombre}</li>
         <li>Email: ${correo}</li>
         <li>Telefono: ${telefono}</li>
       </ul>
       <h3>Mensaje</h3>
       <p>${asunto}</p>
     `;
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        secureConnection: false,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'marce.753@gmail.com', // generated ethereal user
            pass: 'ifilayhere1'  // generated ethereal password
        },
        tls:{
            ciphers:'SSLv3',
          rejectUnauthorized:false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Nodemailer Contact" <marce.753@gmail.com>', // sender address
          to: 'marce.753@gmail.com', // list of receivers
          subject: 'Node Contact Request', // Subject line
          html: output
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
      });
      
    }

 app.post('/contactForm',function(req,res){
    console.log("req.body.asunto");
    enviar(req.body.correo,req.body.asunto, req.body.telefono, req.body.nombre);
    res.send("Mensaje enviado exitosamente");
  
});


app.listen(7002,function(){
    console.log("Working on port 7002");
});