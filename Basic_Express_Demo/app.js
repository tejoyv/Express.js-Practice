const express = require("express");
const app = express();

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
	//_dirname automatically find the project dir
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})