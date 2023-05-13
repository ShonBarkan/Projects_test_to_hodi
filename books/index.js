const express = require('express')
const mongoose= require('mongoose')
const books = require('./routes/books')
const cors = require('cors')


const app = express();
mongoose.connect('mongodb://localhost:27017//books')
  .then( () => console.log('Connected to MongoDB'))
  .catch( err => console.log('coudnt connect to MogoDB') )
  mongoose.set('strictQuery', false);

app.use(cors())
app.use(express.json()); // conver json to javascript and javascript to json
app.use(express.static('public'))

  
app.use('/api',books);

// PORT 
app.listen(4001, () => console.log(`active on ${port}`))