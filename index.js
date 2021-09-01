var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config()
 
var app = express()
 

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qyyku.mongodb.net/fresh-valley-1?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
 
app.use(cors())



client.connect(err => {
  const collection = client.db("fresh-valley").collection("product");
   console.log('Database Connected');
   app.post('/products', (req, res) => {
       collection.insertOne(req.body)
       .then(result => {
           res.send(result.insertedCount < 0)
           console.log('Data Submitted Successfully');
       })
   })
   app.get('/products', (req, res) => {
       collection.find({})
       .toArray((err, documents) => {
           res.send(documents)
       })
   })



});

 
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(4008, () => console.log('Listening from port'))