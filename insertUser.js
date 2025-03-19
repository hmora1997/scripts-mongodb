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

    userCognitoSub = "24280458-8091-70d7-0348-521b986eb123";

    const newUser = {
      _id: userCognitoSub,
      firstName: "test",
      lastName: "test",
      email: "test@dominio.com",
      role: "67cb25e1569db8c516a8a187",
      created_at: new Date(),
      updated_at: new Date(),
      user: userCognitoSub,
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
