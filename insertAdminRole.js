const { MongoClient, ObjectId } = require("mongodb");

const { MongoClient } = require("mongodb");
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const clusterEndpoint = process.env.DB_ENDPOINT;
const databaseName = process.env.DB_NAME;

const encodedPassword = encodeURIComponent(password);

// const uri = `mongodb://${user}:${encodedPassword}@${clusterEndpoint}/${databaseName}?authSource=admin&ssl=true&tlsAllowInvalidCertificates=true&retryWrites=false`;
const uri = "mongodb://localhost:27017/AWSDocumentDB";
const collectionName = "RolesBkCollection";

const client = new MongoClient(uri);

async function insertAdminRole() {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const adminRole = {
      name: "Administrador",
      permissions: [
        { resource: "signature", actions: ["view", "add", "edit", "delete"] },
        { resource: "channel", actions: ["view", "add", "edit", "delete"] },
        { resource: "users", actions: ["view", "add", "edit", "delete"] },
        { resource: "roles", actions: ["view", "add", "edit", "delete"] },
        {
          resource: "identification",
          actions: ["view", "add", "edit", "delete"],
        },
      ],
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await collection.insertOne(adminRole);
    console.log("Admin role inserted with _id:", result.insertedId);
  } catch (error) {
    console.error("Error inserting admin role:", error);
  } finally {
    await client.close();
  }
}

insertAdminRole();
