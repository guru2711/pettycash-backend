const mongoose = require("mongoose")

const RegisterSchema = mongoose.Schema({
    username:{
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    email:{
        type: String,
        minlength: 4,
        maxlength: 40,
        unique: true,
        required: true
    },
    password:{
        type: String,
        minlength: 4,
        required: true
    }
})

module.exports = mongoose.model("registration",RegisterSchema)