const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	var today = new Date();

	if(today.getDay()===6 || today.getDay()===0){
		res.send("Today is weekend");
	}else{
		res.send("Today is weekday");
	}
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})