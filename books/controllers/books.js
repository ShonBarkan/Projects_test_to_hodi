
const express = require('express')
const {Book} = require('../Models/books')

//add new Books
const newBook = async (req, res) => {
    try {
      const {bookAuthor,bookName} = req.body;
      const newBook = new Book({bookAuthor,bookName});
      await newBook.save();
      res.status(201).send(newBook);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

  //*********** exports **************//

  module.exports = {
    newBook
  };