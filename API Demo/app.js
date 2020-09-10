const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

	res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){
	//console.log("Post request recieved");
	//const city = request.body.cityName;
	
	var city = req.body.cityName;
	var unit = "metric";

	var url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ process.env.WEATHER_API_KEY +"&units="+unit;


	https.get(url,function(response){
		//console.log(response.statusCode);

		response.on("data",function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;

			const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

			res.write("<p>The weather in "+ city +" is currently "+desc+"</p>");
			res.write("<h1>The temperature in "+ city +" is "+temp+"*C</h1>");
			res.write("<img src="+imageURL+">");
			res.send();
		})
	})
})

app.listen("3000",function(req,res){
	console.log("Express Server running on port 3000");
});