const mongoose = require ("mongoose");

const propertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    price: {type: String, required: true}
});

module.exports = mongoose.model("Property", propertySchema);