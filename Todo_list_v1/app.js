const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname+"/date.js")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var items=["Buy Food","Cook Food","Eat Food"];
var workItems=[]; // list for work items

app.get("/",function(req,res){

	var day = date.getDay();

	res.render("list",{todayIsDay:day,newItem:items});
})

app.get("/about",function(req,res){
	res.render("about");
})

app.post("/",function(req,res){
	
	task = req.body.taskName;
	
	if(req.body.button === "Work List"){
		
		workItems.push(task);
		res.redirect("/work");
	}else{
		items.push(task);
		res.redirect("/");
	}
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