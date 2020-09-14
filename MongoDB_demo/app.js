const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Create a schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Why no name ?"]
  },
  rating: {
    type: Number,
    min: 1,
    max:10
  },
  review: String
});

// Create a model
const Fruit = mongoose.model("Fruit",fruitSchema); // here Fruit is the collection name.Always we'll write in singular form mongoose automatically lowerscase and makes plural. i.e our collection name will be fruits

// // create a document
// const fruit = new Fruit({
//   rating: 7,
//   review: "Good"
// });

// fruit.save();


Fruit.updateOne({_id:"5f5fb2445aae343ff05248ba"},{name:"Peach"},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated");
  }
})


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

// Fruit.find(function(err,fruits){
//   if(err){
//     console.log(err);
//   }else{
//     fruits.forEach(function(fruit){
//       console.log(fruit.name);
//     })
//     mongoose.connection.close();
//   }
// })

const pineapple = new Fruit({
  name: "pineapple",
  rating: 10,
  review: "great fruit"
})

pineapple.save();


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const person = new Person({
  name: "Tejoy",
  age: 22,
  favouriteFruit: pineapple
})

person.save();


Fruit.deleteOne({name:"Peach"},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully deleted the entry");
  }
})

Person.deleteMany({name:"Tejoy"},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully deleted the entries");
  }
})