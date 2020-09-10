const express = require("express");
const app = express();

app.get("/",function(req,res){
	res.send("Server response");
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})