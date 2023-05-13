const express = require('express');
const router = express.Router();
const {newBook} = require ('../controllers/books.js');

router.post('/books', newBook);

module.exports = router;

