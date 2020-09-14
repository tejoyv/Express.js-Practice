const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Create a schema
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

// Create a model
const Fruit = mongoose.model("Fruit",fruitSchema); // here Fruit is the collection name.Always we'll write in singular form mongoose automatically lowerscase and makes plural. i.e our collection name will be fruits

// create a document
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Good"
});

//fruit.save();

// const kiwi = new Fruit({
//  name: "Kiwi",
//  rating: 10,
//  review: "The best fruit"
// });

// const orange = new Fruit({
//  name: "Orange",
//  rating: 4,
//  review: "Too sour"
// });

// const banana = new Fruit({
//  name: "Banana",
//  rating: 3,
//  review: "Wierd texture"
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully saved all fruits to fruitsDB");
//   }
// })

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{
    console.log(fruits);
  }
})


const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person",personSchema);

const person = new Person({
  name: "Tejoy",
  age: 22
})

person.save();