const mongoose = require('mongoose')

const Schema = mongoose.Schema ;

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFoods: [String]
})


const User = mongoose.model('users',userSchema)

module.exports = User