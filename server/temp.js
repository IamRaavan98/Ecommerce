const { MongoClient } = require('mongodb');
const fs = require('fs');
const jsonData = require('../server/data.json');

// Replace the connection string with your own
const uri = 'mongodb+srv://RohanAdmin:Rohan123@cluster0.cpbudzy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function uploadData() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Replace 'database-name' and 'collection-name' with your own
    const database = client.db('test');
    const collection = database.collection('orders');

    // Extract the array from the object
    const dataArray = jsonData[Object.keys(jsonData)[0]];

    // Insert data into the collection
    const result = await collection.insertMany(dataArray);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection when done
    await client.close();
    console.log('Connection closed');
  }
}

uploadData();
