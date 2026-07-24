const express = require('express');
const router = express.Router(); 
const userService = require('../services/userService');

router.get('/users', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) { 
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

module.exports = router;