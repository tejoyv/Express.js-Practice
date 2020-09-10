const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.send("Server response");
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})