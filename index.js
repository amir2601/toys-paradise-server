const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tujztw6.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const toysCollection = client.db('toysParadise').collection('toys')


    // Creating index on two fields
    const indexKeys = { toy_name: 1};
    const indexOptions = { name: "toyName" };

    const result = await toysCollection.createIndex(indexKeys, indexOptions);


    app.get('/toySearch/:text', async (req, res) => {
      const searchText = req.params.text;
      const result = await toysCollection.find({
        $or: [
          { toy_name: { $regex: searchText, $options: 'i' }}
        ],
      }).toArray();

      res.send(result);
    })



    // all toys

    app.get('/allToys', async (req, res) => {
      const cursor = toysCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // single toy details

    app.get('/toy/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await toysCollection.findOne(query);
      res.send(result);
    });

    // delete toy

    app.delete('/allToys/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await toysCollection.deleteOne(query);
      res.send(result);
    });

    // Add Toy

    app.post('/allToys', async (req, res) => {
      const newToy = req.body;
      console.log(newToy);
      const result = await toysCollection.insertOne(newToy);
      res.send(result);
    });

    app.get('/myToys/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await toysCollection.findOne(query);
      res.send(result)
    })

    // My toys

    app.get('/myToys', async (req, res) => {
      let query = {}
      if (req.query?.email) {
        query = {seller_email: req.query.email}
      }
      const result = await toysCollection.find(query).toArray();
      res.send(result);
    })

    app.get('/myToys', async (req, res) => {
      const cursor = toysCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.patch('/myToys/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const updatedToy = req.body;
      const updateDoc = {
        $set: {
          price: updatedToy.price, quantity: updatedToy.quantity, description: updatedToy.description
        }
      }
      const result = await toysCollection.updateOne(filter, updateDoc);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close or comment when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('toys is running')
})

app.listen(port, () => {
    console.log(`toys paradise server is running on port: ${port}`);
})