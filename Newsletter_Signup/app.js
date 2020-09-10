const express = require("express");
const bodyParser = require("body-parser");
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

})


app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})


// API KEY
// process.env.API_KEY

// List ID (List you want to keep the subscribers into)
// process.env.List_ID

