const express = require('express');
const cors =require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();



app.use = (cors({
  origin : 'http://localhost:3000/',
  methods:['GET','POST']
}))
app.use = (express.json())




const uri = `mongodb+srv://${process.env.DATA_ID}:${process.env.DATA_PASS}@volunteers.uz1ujgp.mongodb.net/?retryWrites=true&w=majority&appName=volunteers`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database= client.db("volunteers").collection('event');
    

    app.get('/products', async(req, res) => {
        const query ={};
        const cursor = database.find(query);
        const data= await cursor.toArray();
        res.send(data)
      })


  }
 finally {
    
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('volantier network is ready...')
});
app.listen(port,()=>{
    console.log('server is ready')
});
