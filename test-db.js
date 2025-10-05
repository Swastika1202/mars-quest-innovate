const { MongoClient } = require('mongodb');

// Connection URI - default MongoDB local connection string
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Create a new MongoClient
const client = new MongoClient(uri);

async function testConnection() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    // Get the database
    const db = client.db(dbName);
    
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections in database:', collections.map(c => c.name));
    
    // Get server status
    const serverStatus = await db.command({ serverStatus: 1 });
    console.log('🔄 MongoDB server version:', serverStatus.version);
    
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure MongoDB is running locally');
    console.log('2. Check if MongoDB service is running (run `mongod --version` in terminal)');
    console.log('3. If using a different port, update the connection string in test-db.js');
  } finally {
    // Close the connection
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run the test
testConnection();
