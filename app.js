/*
	CONFIGURACIONES DE EXPRESS Y DE LAS PETICIONES CON BODYPARSER
*/

'use strict'
// Cargar el modulo y tener el objeto express disponible
var express = require('express');
// cargar el bodyParser
var bodyParser = require('body-parser');

// Ejecutamos la funcion express
var app = express();

// Cargar archivos de rutas
var project_routes = require('./routes/project');


// COnfiguracion de middlewares -> una capa que se ejecuta antes de 
// la accion de un controlador

// config necesaria para el bodyparser
app.use(bodyParser.urlencoded({extended:false}));
// cualquier tipo de peticion, que la convierta a json
app.use(bodyParser.json());


// Configuración del CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// Cargar las rutas en sí

// Con un middelware, importamos las rutas en el app.js del routes
app.use('/api', project_routes);





/*
// RUTAS DE PRUEBAS

app.get('/', (req, res) => {
	// Una respuesta exitosa por parte del servidor
	// send -> enviar los datos
	res.status(200).send(
		// Devuelve un string
		'<h1>Página de inicio</h1>'
	);
})

// get -> recibe una request y una response 
// request -> datos del cliente o la peticion que yo haga
// response -> es la respuesta que yo mando
app.post('/test/:id', (req, res) => {
	// Obtener la informacion de la peticion

	// parametros enviados por el body (No me permite porque uso Insomnia)
	//console.log(req.body.nombre);

	// parametros enviados por el query
	console.log(req.query.nombre);
	//console.log(req.query.apellidos);
	//console.log(req.query.web);

	// paramas -> cuando añadimos un parametro a la url
	console.log(req.params.id);

	// Una respuesta exitosa por parte del servidor
	// send -> enviar los datos
	res.status(200).send({
		// Devuelve un Json
		message: 'Hola mundo desde mi API de nodeJs'
	})
})
*/

// Exportar el módulo
// variable app posee toda la configuracion de los middelwares
module.exports = app;