const express = require("express");
const path = require("path");
const fs = require("fs")
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contact');
}
const app = express();
const port = 8000;

// SCHEMA OF MONGOOSEpm
const contactSchema = new mongoose.Schema({
  name: String ,
  email: String ,
  phone: String ,
  message: String
  
});
const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
  res.status(200).render('home.pug')
})
app.get('/home', (req, res) => {
  res.status(200).render('home.pug')
})

app.get('/contact', (req, res) => {
  res.status(200).render('contact.pug')
})

app.get('/posts', (req, res) => {
  res.status(200).render('posts.pug')
})

app.get('/about', (req, res) => {
  res.status(200).render('about.pug')
})

app.post('/contact', (req, res) => {
  var myData = new contact(req.body)
  myData.save().then(()=>{
    res.send('This item has been saved to the database')
  }).catch(()=>{
    res.status(400).send('item was not saved to the database')
  })
})


// START THE SERVER
app.listen(port, ()=>{
  console.log(`The application is started on port ${port}`)
}) 