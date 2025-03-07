const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/AWSDocumentDB";
const client = new MongoClient(uri);

const databaseName = "AWSDocumentDB";

async function testConnection() {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB.");

    const db = client.db(databaseName);
    const collections = await db.listCollections().toArray();
    console.log(
      "Colecciones en la base de datos:",
      collections.map((col) => col.name)
    );
  } catch (error) {
    console.error("Error conectándose a MongoDB:", error);
  } finally {
    await client.close();
  }
}

testConnection();
