const express = require('express');
const router = express.Router();
const {newUser,logIn} = require ('../controllers/Users');

router.post('/newUser', newUser);
router.post('/logIn', logIn);

module.exports = router;

