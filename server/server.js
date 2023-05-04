const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

// app.use(cors({
//   origin: 'http://localhost:3000/form',
//   optionsSuccessStatus: 200,
//   credentials: true
// }));
app.use(cors());
// middleware to parse-json
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
// 

// routes
// ---------------------------------------------------------------------------------------
// find the data from database if browser hits http:localhost:5000/api endpoint
app.get('/api',async (req,res) =>{
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).send(error)
    }
})
app.get('/api/user/',async (req,res) =>{
  const id = req.query.id
    try {
      const users = await User.findById(id)
      res.json(users)
    } catch (error) {
      res.status(500).send(error)
    }
})
// add users
app.post('/api/user',async (req,res) => {
  try {
    console.log(req.body);
    const user = new User(req.body)
    console.log(user)
    await user.save()
    res.status(201).json(user)
    // res.redirect('http:localhost:3000/form')
    // res.status(201).send()
  } catch (error) { 
    console.log(error)
  }
})

// update the user data
app.put('/api/user/:id',async(req,res)=>{
  try {
    const id = req.params.id
    console.log(req.body)
    const update = await User.findByIdAndUpdate(id,req.body,{ new: true , useFindAndModify: false})
    if(!update){
      res.status(404).send({message : `Cannot Update user with ${id}. Maybe user not found.`})
      }else{
          res.send(update)
      }
  } catch (error) {
    res.status(500).send({message : "Error updating user information"})
  }
})




// delete users
app.delete('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser){
      res.status(200).send({msg : `There is no user with ID : ${id} in the database`})
    }else{
      res.status(200).send({msg: `User with ID ${id} was deleted.`});
    }
  } catch (error) {
    res.status(400).send({msg: "Invalid Delete Operation"});
  }
});
// --------------------------------------------------------------------------------
// add the employees using post request to the database

// database connection
const connectDB = async () => {
  try {
    // mongodb connection string 
    const con = await mongoose.connect('mongodb://127.0.0.1:27017/fuck', {
    })

    console.log(`Mongo DB connedted: ${con.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// mongodb connection
connectDB()

// listening port
app.listen(5000, () => {
  console.log("App is listening at http:localhost:5000")
})