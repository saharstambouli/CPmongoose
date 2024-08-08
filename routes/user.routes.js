const express = require('express')
const User = require('../models/user.schema')
const router = express.Router()


const fakeData = {
    name: 'Mary',
    age: 20,
    favoriteFoods: ['Pizza', 'PastaSalad', 'buttitos']
}

/* // 1  Create Many Records with model.create()
//Function to create multiple people using async/await
async function createManyPeople(arrayOfPeople) {
    try {
        /const people = await Person.create(arrayOfPeople);
        console.log('People created successfully:', people);
    } catch (err) {
        console.error('Error creating people:', err);
    }
} */

// Example usage
const arrayOfPeople = [
    { name: 'mary', age: 25, favoriteFoods: ['Poisson', 'Pizza'] },
    { name: 'salma', age: 35, favoriteFoods: ['Burger', 'Fries'] },
    { name: 'sami', age: 28, favoriteFoods: ['Steak', 'Salad'] }
];

/* createManyPeople(arrayOfPeople); */



//add one people 

router.get('/add-user', (req, res) => {
    const newPerson = new User(fakeData)
    newPerson.save()
        .then(() => res.send("user saved success!!"))
        .catch((err) => console.log(err))
})


//add array of peaople
router.get('/add-users', (req, res) => {
    User.insertMany(arrayOfPeople)
        .then(() => res.send("Users saved successfully!"))
        .catch((err) => console.log(err));
});



//2    Use model.find() to Search Your Database
//Find all the people having a given name, using Model.find() -> [Person]
//find person with his name 

router.get('/get-user/:name', (req, res) => {
    const name = req.params.name;

    User.find({ name: name })
        .then((data) => res.json(data))
        .catch((err) => console.log('Error:', err));
});


//find person with a specific favorite food 


router.get('/get-user/:food', (req, res) => {
    const food = req.params.food;

    User.findOne({ favoriteFoods: { $in: [food] } })
        .then((data) => res.json(data))
        .catch((err) => console.log('Error:', err));
});



//Use model.findById() to Search Your Database By _id
//find by id 

router.get('/get-user/:id', (req, res) => {
    const id = req.params.id

    User.findOne({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => console.log('err', err))


})




//Perform Classic Updates by Running Find, Edit, then Save


router.get('/update-user/:personId', (req, res) => {
    const personId = req.params.personId;

    User.findById(personId)
        .then(person => {
            if (!person) {
                return res.status(404).send('Person not found');
            }

            // Add "hamburger" to the favoriteFoods array
            person.favoriteFoods.push('hamburger');

            // Save the updated person
            return person.save();
        })
        .then(updatedPerson => {
            res.status(200).json(updatedPerson);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});



//Perform New Updates on a Document Using model.findOneAndUpdate()
// find user by id and update age of user : 20  

router.get('/update-user/:name', (req, res) => {
    const name = req.params.name;

    User.findOneAndUpdate(
        { name: name },
        { age: 20 },
        { new: true }
    )
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            console.log('err', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

//Delete One Document Using model.findByIdAndRemove
//find by id and delete 
router.get('/delete-user/:id', (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete({ _id: id })
        .then(() => res.send('user deleted successfuly'))
        .catch((err) => console.log('err', err))
})





/* Delete Many Documents with model.remove() */

router.get('/delete-user', (req, res) => {
    User.deleteMany({ name:'Mary'})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).send(err.message); // Send error message in response
        });
});


//Chain Search Query Helpers to Narrow Search Results


router.get('/like-burrits', (req, res) => {
    User.find({ favoriteFoods: 'burritos' })
        .sort({ name: 1 }) // Sort by name in ascending order
        .limit(2) // Limit the results to two documents
        .select('-age') // Exclude the age field
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
});




    module.exports = router