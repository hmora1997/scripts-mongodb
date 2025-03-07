const { MongoClient } = require("mongodb");

// URI de conexión para Docker
const uri = "mongodb://localhost:27017/AWSDocumentDB";
const client = new MongoClient(uri);

// Nombre de la base de datos y colección de roles
const databaseName = "AWSDocumentDB";
const collectionName = "RolesBkCollection"; 

async function insertAdminRole() {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const adminRole = {
      name: "Admin",
      permissions: [
        {
          resource: "0",
          actions: {
            resource: "signature",
            actions: ["view", "add", "edit", "delete"]
          }
        },
        {
          resource: "1",
          actions: {
            resource: "channel",
            actions: ["view", "add", "edit", "delete"]
          }
        },
        {
          resource: "2",
          actions: {
            resource: "users",
            actions: ["view", "add", "edit", "delete"]
          }
        },
        {
          resource: "3",
          actions: {
            resource: "roles",
            actions: ["view", "add", "edit", "delete"]
          }
        },
        {
          resource: "4",
          actions: {
            resource: "identification",
            actions: ["view", "add", "edit", "delete"]
          }
        }
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
