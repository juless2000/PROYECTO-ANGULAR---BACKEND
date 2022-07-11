/* Fichero donde vamos a configurar el proyecto de NodeJs

	Creacion del Servidor
	Conexion a la BD
	Importaciones de archivos
*/
'use strict'

// ESTABLECER LA CONEXION CON LA BASE DE DATOS MONGO DB

// Importar el modulo de mongoose
var mongoose = require('mongoose');
// Cargar el archivo app.js que es la configuracion de Express
var app = require('./app.js');
// Puerto de mi servidor
var port = 3700;


//Realizar la conexion a la BD 

// Indicar que es una Promesa
mongoose.Promise = global.Promise;
// metodo connect y le pasamos la URL de nuestra BD en mongo
// como es una promesa se le pasa un .then para comprobar la conexion
mongoose.connect('mongodb://localhost:27017/portafolio')
		.then(() =>{
			console.log("Conexión a la base de datos establecida con éxito...");

			// CREACION DEL SERVIDOR
			// listen -> metodo de Express
			app.listen(port, () => {
				console.log("Servidor iniciado correctamente en la URL localhost:3700");
			})


		})
		.catch(error => console.log(error));

/* Utilizamos el comando npm start para ejecutar el script y comprobar
la conexion*/ 		