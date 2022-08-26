const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstname = (req.body.firstname);
    const lastname= (req.body.lastname);
    const email = (req.body.email);
    const data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/fe737e736b";
    const options={
        method: "POST",
        auth: "arijitkayal:fb40f2e8dcd2e8c7d1dfb1eb79c5e916-us10",

    }

    const request= https.request(url,options,function(responce){
       if (responce.statusCode ===200){
        res.sendFile(__dirname+"/success.html");
       }
       else{
        res.sendFile(__dirname+"/failure.html");
       }

        responce.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 ,function(){
    console.log("The server is running on port 3000");
});

//API KEY
// fb40f2e8dcd2e8c7d1dfb1eb79c5e916-us10
//ID
//fe737e736b