const router = require ("express").Router();
const User = require ("../models/User");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const {name, email, password} = req.body;
        const existing = await User.findOne({email});

        if (existing) {
            console.log("User already exists");
            return res.status(400).json({status: 400, error: "Email already exists"});
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed
        });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({status: 200, token});

    } catch(err) {
        console.error("ERROR:", err);
        res.status(500).json({status: 500, error: err.message});
    }
});

router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: "User not found"});
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({status: 400, error: "Invalid Password"});
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        res.json({status: 200, userId: user._id, token});
    } catch (err) {
        res.status(500).json({status: 500, error: err.message})
    }
});

module.exports = router;