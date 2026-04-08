const router = require ("express").Router();
const Property = require ("../models/Property");
const auth = require ("../middleware/auth");

//Create Property
router.post("/listProperty", auth , async (req, res) => {
    try {
        const property = new Property({...req.body, userId: req.user.userId});
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Get Properties
router.get("/", auth, async (req, res) => {
  const properties = await Property.find({ userId: req.user.userId });
  res.json(properties);
});

module.exports = router;