const express = require("express");
const app = express();

app.get("/",function(req,res){
	res.send("Server is running");
})

app.listen("3000",function(req,res){
	console.log("Express Server running on port 3000");
});