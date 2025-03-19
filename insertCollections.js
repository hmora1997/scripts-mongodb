const { MongoClient } = require("mongodb");

require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const clusterEndpoint = process.env.DB_ENDPOINT;
const databaseName = process.env.DB_NAME;

const encodedPassword = encodeURIComponent(password);

// const uri = `mongodb://${user}:${encodedPassword}@${clusterEndpoint}/${databaseName}?authSource=admin&ssl=true&tlsAllowInvalidCertificates=true&retryWrites=false`;
const uri = "mongodb://localhost:27017/AWSDocumentDB";

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
  "UsersBkCollection",
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
