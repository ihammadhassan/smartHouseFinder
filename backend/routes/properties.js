const router = require ("express").Router();
const Property = require ("../models/Property");
const auth = require ("../middleware/auth");

//Create Property
router.post("/list-property/", auth , async (req, res) => {
    try {
        res.json(req.body);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});