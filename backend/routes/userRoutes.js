const express = require('express');
const User = require('../models/user');
const Address = require('../models/Address');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, address } = req.body;

    try {
        // Create a new user
        const newUser = new User({ name });
        const savedUser = await newUser.save();

        // Create a new address linked to the user
        const newAddress = new Address({ userId: savedUser._id, address });
        await newAddress.save();

        res.status(201).send('User and address registered successfully!');
    } catch (error) {
        console.error('Error saving user or address:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
