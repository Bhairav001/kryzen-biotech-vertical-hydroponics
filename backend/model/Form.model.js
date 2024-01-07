const mongoose = require("mongoose");

const FormSchema = mongoose.Schema({
    name:String,
    age:Number,
    address:String,
    photo:String
})

const FormModel = mongoose.model("form",FormSchema);

module.exports={
    FormModel
}