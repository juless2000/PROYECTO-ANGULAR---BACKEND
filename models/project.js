// Un modelo representa a un documento de la coleccion de la BD
// Entidad o referencia a un documento de la Base de datos
'use strict'

// Importar mongoose que se encarga de trabajar con los modelos
var mongoose = require('mongoose');

// Definir el esquema de un modelo
var Schema = mongoose.Schema;

// El esquema de Project-> el molde sobre el cual voy a estar utilizando
// para crear nuevos proyectos de este tipo
var ProjectSchema = Schema({
	name: String,
	description: String,
	category: String,
	year: Number,
	langs: String,
	image: String
});

// para poder importar/exportar el fichero 
module.exports = mongoose.model('Project', ProjectSchema);
// mongoose -> pone en minusculas y en plural el nombre del modelo ('Project')
// projects -> guarda los documentos en la coleccion


/* MVC

Modelos de consulta: Clases en las cuales tenemos diferentes métodos
que acceden directamente a la BD. Logica de negocio, serie de consultas y
se lo devolvemos al controlador.

Vista: Es la encargada de mostrar lainformacion al usuario. Como es un Api
Rest, nuestra vista serán los Json que devolvemos al usuario que haga la peticion.

Controlador: Intermediario entre la vista y el modelo, y se encarga de controlar
todas las interacciones del usuario y todas las peticiones que se 
vayan realizando mediante http. Pide los datos al modelo, devuelve la 
informacion por Json(Vista), y hace cierta logica que vaya a tener
nuestro programa.

*/