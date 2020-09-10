const express = require("express");
const https = require("https");
require('dotenv').config()

const app = express();

app.get("/",function(req,res){

	var url = "https://api.openweathermap.org/data/2.5/weather?q=Vadodara&appid="+ process.env.WEATHER_API_KEY +"&units=metric";

	https.get(url,function(response){

		response.on("data",function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			console.log(temp);
			console.log(desc);

			const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
			console.log(imageURL);

			res.write("<p>The weather in Vadodara is currently "+desc+"</p>");
			res.write("<h1>The temperature in Vadodara is "+temp+"*C</h1>");
			res.write("<img src="+imageURL+">");
			res.send();
		})
	})
})

app.listen("3000",function(req,res){
	console.log("Express Server running on port 3000");
});