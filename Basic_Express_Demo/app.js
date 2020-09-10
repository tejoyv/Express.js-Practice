const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
	//_dirname automatically find the project dir
})

app.get("/bmi",function(req,res){
	res.sendFile(__dirname+"/bmi.html");
})

app.post("/",function(req,res){
	var num1 = Number(req.body.num1);
	var num2 = Number(req.body.num2);
	var result = num1+num2;

	res.send("The result of the calculation is : "+result);
})

app.post("/bmi",function(req,res){
	var weight = req.body.weight;
	var height = req.body.height;
	var bmi = weight/(height*height);

	res.send("Your BMI score is : "+bmi);
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})