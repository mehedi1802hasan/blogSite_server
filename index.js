const express =require('express');
const cors = require('cors');
const app = express();
const port =process.env.PORT ||2000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

//middleware
app.use(express.json());
app.use (cors());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rin8xcl.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


   const bannerCollection = client.db("blogSite").collection("banner");
   const storyCollection = client.db("blogSite").collection("story");
   
   // banner get 
   app.get('/banner',async(req,res)=>{
    const result =await bannerCollection.find().toArray();
    res.send(result)
   })

   // get stories
   app.get('/story',async (req,res)=>{
    const result =await storyCollection.find().toArray();
    res.send(result);
   })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   //await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send( `user management runnuing`)
})
app.listen(port,()=>{
    console.log(`server is runnign Port : ${ port}`)
})