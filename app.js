//jshint esversion:6

//MongoDB Mongoose Driver with Node js

const mongoose = require('mongoose'); // ~~~~ Create DB: ~~~~

mongoose.connect("mongodb://localhost:27017/fruitsDB", {  // Connection URL
    useNewUrlParser: true,
    useUnifiedTopology: true } );

const fruitSchema = new mongoose.Schema ({ //~~~~ ADD content: ~~~~
    name: { //validation
		type: String,
		required: [true, "Please check your data entry, no name specified"]
	},
    rating: {
		type: Number,
		min: 1,
		max: 10
	},
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    rating: 10,
    review: "Peaches are so yummy!"
})

fruit.save(); //comentar depois de salvar a primeira vez para não ter duplicatas

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
	favoriteFruit: fruitSchema //Establishing Relationships
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
   	 	name: "John",
    	age: 37
	})

//person.save();

const pineapple = new Fruit({
	name:"Pineapple",
	rating: 7,
	review: "Nice fruit"
})
pineapple.save();

const person = new Person({
	name:"Amy",
	age: 12,
	favoriteFruit: pineapple
})
person.save();

/*
const apple = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Great solid fruit"
})

const kiwi = new Fruit ({
	name: "Kiwi",
	rating: 10,
	review: "The best fruit"
})
	
const orange = new Fruit ({
	name: "Orange",
	rating: 4,
	review: "Too sour for me"
})
	
const banana = new Fruit ({
	name: "Banana",
	rating: 3,
	review: "Weird texture"
})
	
Fruit.insertMany([apple, kiwi, orange,banana], function(err){	
	if(err){
		console.log(err);
	} else {
		console.log("Sucessfully saved all fruits to fruitsDB")
	}
});
*/

Fruit.find(function(err, fruits){ //~~Find
	if(err){
		console.log(err);
	} else {
		//console.log(fruits);

		mongoose.connection.close(); // CLOSE Connection URL (last action)

		fruits.forEach(function(fruit){
			console.log(fruit.name);
		})
	}
})

//update method
/*
Fruit.updateOne({ _id:"gerado no hyper"}, {name: "Peach"}, {function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Sucessfully update the document");
	}
	}
});
*/

//delete method
/*
Fruit.deleteOne({name: "Peach"}, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Sucessfully deleted the document");
	}
})

Person.deleteMany({name:"John"}, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Sucessfully deleted all the documents");
	}
})
*/
 



