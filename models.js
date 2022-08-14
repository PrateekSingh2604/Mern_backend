const mongoose = require("mongoose");
const firstApp = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
         message: {
            type: String
         }
    }
)

const Register = mongoose.model("customer", firstApp);
module.exports = Register;
