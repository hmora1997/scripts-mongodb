const { MongoClient } = require("mongodb");
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const clusterEndpoint = process.env.DB_ENDPOINT;
const databaseName = process.env.DB_NAME;

const encodedPassword = encodeURIComponent(password);

// const uri = `mongodb://${user}:${encodedPassword}@${clusterEndpoint}/${databaseName}?authSource=admin&ssl=true&tlsAllowInvalidCertificates=true&retryWrites=false`;
const uri = "mongodb://localhost:27017/AWSDocumentDB";
const collectionName = "UsersBkCollection";

async function insertUser() {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    userCognitoSub = "24280458-8091-70d7-0348-521b986eb123"; //cambiar por el valor que da cognito

    const newUser = {
      _id: userCognitoSub,
      firstName: "test",
      lastName: "test",
      email: "test@dominio.com",
      role: "67cb25e1569db8c516a8a187", //id de rol creado en mongo
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
