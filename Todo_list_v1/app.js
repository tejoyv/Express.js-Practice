const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/",function(req,res){

	var today = new Date();
	var day = today.getDay();

	switch(day){
		case 0:
			day="Sunday";
			break;
		case 1:
			day="Monday";
			break;
		case 2:
			day="Tuesday";
			break;
		case 3:
			day="Wednesday";
			break;
		case 4:
			day="Thursday";
			break;
		case 5:
			day="Friday";
			break;
		case 6:
			day="Saturday";
			break;
		default:
			day="Error";
			console.log(day);
	}

	res.render("list",{todayIsDay:day});
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})