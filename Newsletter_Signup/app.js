const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config()

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
	//console.log("Post request received");
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;

	const data = {
		members : [{
			email_address: email,
			status: "subscribed",
			merge_fields:{
				// Audience->Settings->Audience fields and MERGE tags
				FNAME:fname,    
				LNAME:lname
			}
		}]
	};

	const jsonData = JSON.stringify(data); //convert to JSON to send to mailchimp server

	//we need to make post data to external resource
	// https used for getting data from external resource (one used in API demo)
	//https.request used for post data to external resource here mailchimp server

	// usX -> us17 from API Key 
	const url = "https://us17.api.mailchimp.com/3.0/lists/"+process.env.List_ID;

	const options = {
		method:"POST",
		auth: "tejoy:"+process.env.API_KEY    //Tejoy written anything can be written there
	}

	const request = https.request(url,options,function(response){

		if(response.statusCode===200){
				res.sendFile(__dirname+"/success.html");
			}else{
				res.sendFile(__dirname+"/failure.html");
		}


		response.on("data",function(data){
			console.log(JSON.parse(data));
		})
	})

	// to send the json data to mailchimp earlier defined in jsonData along with the request
	request.write(jsonData);
	request.end();
})

app.post("/failure",function(req,res){
	res.redirect("/");
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})


// API KEY
// process.env.API_KEY

// List ID (List you want to keep the subscribers into)
// process.env.List_ID

