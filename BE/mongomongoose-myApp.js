require('dotenv').config();
const mongoose = require('mongoose');
const { Schema, model } = mongoose;


/** 1) Install & Set up mongoose */
mongoose.connect(
  process.env.MONGO_URI, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }, 
  () => { 
    console.log("DB connection successful!") 
  });

/** 2) Create a 'Person' Model */
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = model('Person', personSchema);

/** 3) Create and Save a Person */
const createAndSavePerson = (done) => {
  var person = new Person(
    { 
      name: "John Doe", 
      age: 13, 
      favoriteFoods: ["eggs", "fish", "fresh fruit"] 
    });

  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  { name: "John Doe I", age: 51, favoriteFoods: ["eggs", "fish", "fresh fruit"]},
  { name: "John Doe II", age: 31, favoriteFoods: ["eggs", "fish", "fresh fruit"]},
  { name: "John Doe III", age: 11, favoriteFoods: ["eggs", "fish", "fresh fruit"]}
]

/** 4) Create Multiple Persons */
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, data) => {
    data.favoriteFoods.push(foodToAdd)
    data.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
