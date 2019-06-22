var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());
var access_token = "rIOCi5ylE4AAAAAAAAAAM7SR4XR_IFLsKpXGSZyDl0qkmTcn8QfvzwWn_JcHQ-V3";
const formidable = require('formidable')

var content;
function uploadDropbox(file){
    content = fs.readFileSync(__dirname +'/uploads/'+file.name);
    options = {
                method: "POST", 
                url: 'https://content.dropboxapi.com/2/files/upload',
                headers: {
                  "Content-Type": "application/octet-stream",
                  "Authorization": "Bearer " + access_token,
                  "Dropbox-API-Arg": "{\"path\": \"/sis-web/"+file.name+"\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false}",
                },
                body:content
            };
            request(options,function(err, res,body){
                        console.log("Err : " + err);
                        console.log("res : " + res);
                        console.log("body : " + body);   
                        if(err) 
                           console.log("Error uploading file.");
                       console.log("File is uploaded")})
}

 app.post('/upload',function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
        
    });

    form.on('file', function (name, file){
       (uploadDropbox(file))
      
    });
    res.send("OK");


  
});

app.listen(7001,function(){
    console.log("Working on port 7001");
});