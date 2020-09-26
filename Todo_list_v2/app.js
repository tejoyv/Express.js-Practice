//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});

// Schema
const itemsSchema = {
  name: String
};

// Model
const Item = mongoose.model("Item",itemsSchema);

// Document
const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name : "<-- Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];

app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){

    //foundItems is an array check by console logging
    //this is for default items
    if(foundItems.length === 0){
      Item.insertMany(defaultItems,function(err){
      if(err){
          console.log(err);
        }else{
          console.log("Successfully saved default items to DB");
        }
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();
  res.redirect("/");

});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  // console.log(checkedItemId);

  Item.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Successfully deleted the checked item");
      res.redirect("/");
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
