const mongoose = require ("mongoose");

const propertySchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, require: true},
    location: {type: String, require: true},
    price: {type: Number, require: true}
});

module.exports = mongoose.model("Property", propertySchema);