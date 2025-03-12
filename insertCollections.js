const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/AWSDocumentDB";
const client = new MongoClient(uri);

const databaseName = "AWSDocumentDB";

const collectionsToCreate = [
  "ChannelsBkCollection",
  "GlobalParametersBkCollection",
  "IdentificationsBkCollection",
  "LogsRoleBkCollection",
  "LogsUsersBkCollection",
  "ProcessBkCollection",
  "RolesBkCollection",
  "SignatoriesBkCollection",
  "SignaturesBkCollection",
  "TokenActivoBkCollection",
  "UsersBkCollection"
];

async function insertCollections() {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB.");

    const db = client.db(databaseName);
    const existingCollections = await db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map((col) => col.name);
    for (const collName of collectionsToCreate) {
      if (!existingCollectionNames.includes(collName)) {
        await db.createCollection(collName);
        console.log(`Creada la colección: ${collName}`);
      } else {
        console.log(`La colección ya existe: ${collName}`);
      }
    }
  } catch (error) {
    console.error("Error al crear las colecciones:", error);
  } finally {
    await client.close();
  }
}

insertCollections();
