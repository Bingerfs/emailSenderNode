var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
var nodemailer = require('nodemailer');
app.use(cors({
    origin: 'http://localhost:4200'
  }));
   function enviar(destinatario,asunto){
        let remitente ='arquipruebas86@gmail.com';
        let transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: remitente,
               pass: 'arquitectura86'
           }

       });
        var mailOptions = {
            from: remitente,
            to: destinatario,
            subject: asunto,
            text: "Su consulta fue recibida correctamente"
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
              return console.log(error);
            }
            console.log('Message sent: ' + info.response);
      });
      
    }

 app.post('/contactForm',function(req,res){
    enviar(req.body.destinatario,req.body.asunto)
    res.send("Mensaje enviado exitosamente");
  
});


app.listen(7002,function(){
    console.log("Working on port 7002");
});