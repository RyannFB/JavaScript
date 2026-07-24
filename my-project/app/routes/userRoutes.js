const express = require('express'); 
const router = express.Router(); 
const userController = require('../controllers/userController'); // Import the user controller of BD

router.use('/users', userController); 

module.exports = router; 