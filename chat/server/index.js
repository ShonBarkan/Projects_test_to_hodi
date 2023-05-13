const express = require('express');
const mongoose= require('mongoose')
const cors = require('cors');
const users = require('./routes/Users');

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/chat')
.then( () => console.log('Connected to MongoDB'))
.catch( err => console.log(err) )
mongoose.set('strictQuery', false);


app.use(cors());
app.use(express.json()); // conver json to javascript and javascript to json
app.use(express.static('public'))

app.use('/api/users',users);


// PORT 
const port = process.env.PORT || 3006; 

app.listen(port, () => console.log(`active on ${port}`))