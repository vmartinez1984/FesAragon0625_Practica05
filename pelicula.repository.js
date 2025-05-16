//Configuración de base de datos
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://superiorviktor:4hzYZt1lSTcBCycU@cluster0.53l4ojb.mongodb.net/";
//var url = "mongodb://root:123456@localhost:27017/?authMechanism=DEFAULT";
const baseDeDatos = "FesAragon";
const coleccion = "Peliculas";

async function conectarAlaDbAsync() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(baseDeDatos);
  const dbCollection = db.collection(coleccion);

  return dbCollection;
}

async function obtenerPorId(id) {
  const dbCollection = await conectarAlaDbAsync();
  const pelicula = await dbCollection.findOne({ id: Number(id) });
  //console.log(pelicula);
  return pelicula;
}

async function obtenerTodos() {
  const dbCollection = await conectarAlaDbAsync();
  const lista = await dbCollection.find({}).toArray();
  //console.log(lista)
  return lista;
}

async function agregar(pelicula) {
  const dbCollection = await conectarAlaDbAsync();
  //Simular el autoincrementable
  const totalDocumentos = await dbCollection.countDocuments();
  let id = totalDocumentos + 1;
  pelicula.id = id;
  let resultado = await dbCollection.insertOne(pelicula);
  console.log(resultado);

  return id;
}

module.exports = {
  obtenerPorId,
  obtenerTodos,
  agregar,
};
