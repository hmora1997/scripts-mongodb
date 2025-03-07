const { MongoClient } = require("mongodb");

//const uri = "mongodb://<usuario>:<contraseña>@<host>:<puerto>/<nombreDB>?authSource=admin";
const uri = "mongodb://localhost:27017/AWSDocumentDB";
const client = new MongoClient(uri);

const databaseName = "AWSDocumentDB";
const collectionName = "UsersBkCollection";

async function insertUser() {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const newUser = {
      // Puedes generar un _id propio o dejar que Mongo lo genere automáticamente
      // _id: 'nuevo-id-personalizado',
      firstName: "Nuevo",
      lastName: "Usuario",
      email: "nuevo@dominio.com",
      role: "67cb25e1569db8c516a8a187",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await collection.insertOne(newUser);
    console.log("Usuario insertado con _id:", result.insertedId);
  } catch (error) {
    console.error("Error insertando usuario:", error);
  } finally {
    await client.close();
  }
}

insertUser();
