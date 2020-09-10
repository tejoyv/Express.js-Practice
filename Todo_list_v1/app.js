const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/",function(req,res){

	var today = new Date();
	var day = "";

	if(today.getDay===6 || today.getDay()===0){
		day="Weekend";
	}else{
		day="Weekday";
	}

	res.render("list",{todayIsDay:day});
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})