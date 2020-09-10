const express = require("express");
const app = express();

app.get("/",function(req,res){
	res.send("<h1>Hello</h1>");
})

app.get("/contact",function(req,res){
	res.send("contact details");
})

app.get("/about",function(req,res){
	res.send("<h1>Tejoy Vachhrajani</h1>");
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})