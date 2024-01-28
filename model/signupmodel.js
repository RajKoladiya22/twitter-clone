const mongoose = require('mongoose');

const SignupModel = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    c_password : {
        type : String,
        require : true
    },
})

const Signup  = mongoose.model('Signup', SignupModel);

module.exports=Signup;