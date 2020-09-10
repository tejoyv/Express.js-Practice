const express = require("express");
const https = require("https");
require('dotenv').config()

const app = express();

app.get("/",function(req,res){

	var url = "https://api.openweathermap.org/data/2.5/weather?q=Vadodara&appid="+ process.env.WEATHER_API_KEY +"&units=metric";

	https.get(url,function(response){
		console.log(response);
	})
})

app.listen("3000",function(req,res){
	console.log("Express Server running on port 3000");
});