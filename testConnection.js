const { MongoClient } = require("mongodb");
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const clusterEndpoint = process.env.DB_ENDPOINT;
const databaseName = process.env.DB_NAME;

const encodedPassword = encodeURIComponent(password);

// const uri = `mongodb://${user}:${encodedPassword}@${clusterEndpoint}/${databaseName}?authSource=admin&ssl=true&tlsAllowInvalidCertificates=true&retryWrites=false`;
const uri = "mongodb://localhost:27017/AWSDocumentDB";

const client = new MongoClient(uri);

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
