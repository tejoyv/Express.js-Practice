//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _=require("lodash");

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

// Schema for custom lists
const listSchema = {
  name: String,   //Listname
  items:[itemsSchema]
}

// Model for customlists
const List = mongoose.model("List",listSchema);


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

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  // console.log(customListName);

  // if already list exist don't create new add in that
  List.findOne({name:customListName},function(err,foundList){
    if(!err){
      if(!foundList){
        // create a new list
          //custom list document
          const list = new List({
            name : customListName,
            items : defaultItems
          });

          list.save();
          res.redirect("/"+customListName);    
      }else{
        // show an existing list
        res.render("list",{listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  })

})


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    //find the custom list and add the new item to that custom list
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }

});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  // console.log(checkedItemId);
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId,function(err){
      if(!err){
        console.log("Successfully deleted the checked item");
        res.redirect("/");
      }
    })
  }else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err,foundList){
    if(!err){
        res.redirect("/"+listName);
      }
    })    
  }
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
