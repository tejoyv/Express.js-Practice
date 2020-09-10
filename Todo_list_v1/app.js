const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var items=[];
var workItems=[]; // list for work items

app.get("/",function(req,res){

	var today = new Date();

	var options = {
		weekday:"long",
		day:"numeric",
		month:"long"
	}

	var day = today.toLocaleDateString("en-US",options);

	res.render("list",{todayIsDay:day,newItem:items});
})

app.post("/",function(req,res){
	task = req.body.taskName;
	items.push(task);
	res.redirect("/");
})

app.get("/work",function(req,res){
	res.render("list",{todayIsDay:"Work List",newItem:workItems});
})

app.post("/work",function(req,res){
	let item = req.body.taskName;
	workItems.push(item);
	res.redirect("/work");
})

app.listen("3000",function(){
	console.log("Express Server running on port 3000");
})