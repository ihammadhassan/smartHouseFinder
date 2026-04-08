const router = require ("express").Router();
const User = require ("../models/User");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});