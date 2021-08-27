const express = require('express')
const app = express()
const port = 3000
const bd = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
let authModel = require('./authschema')

mongoose.connect('mongodb+srv://maarij12:maarij123@cluster0.qqshp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useCreateIndex : true,
  useNreadOnly : true,
  useUnifiedTopology : true,
})

mongoose.connection.on(('connected'), () => {
  console.log('database connected!!');
})


mongoose.connection.on(('error'), () => {
  console.log('database not connected!!');
})

app.use(cors())
app.use(bd.urlencoded({ extended: false}));
app.use(bd.json())

app.get('/', (req, res) => {

})

app.post('/signup', (req, res) => {
  let userCreate = new authModel({
    email : req.body.email,
    password : req.body.password
  });
  userCreate.save().then((response) => {
    console.log('user created', response);
    res.status(200).send({result: response, message: 'success'})
  }).catch(err => {
    console.log(err)
    res.status(200).send({result: response, message: 'not success'})
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
