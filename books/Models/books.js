
const mongoose = require('mongoose')


const Book = new mongoose.model('Book', new mongoose.Schema({
    bookAuthor: {
        type: String,
      },
    bookName: {
        type: String,
      }
}) ) ;

exports.Book= Book;
 



