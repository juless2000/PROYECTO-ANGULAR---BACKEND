/* CONFIGURACION DE LAS RUTAS DE CONTROLADOR PROJECT */
'use strict'

// Cargar el modulo de express del package.json 
var express = require('express');
// Importar el FICHERO de la variable del controlador la cual exportamos
var ProjectController = require('../controllers/project');

// Cargar el router, Express.router -> servicio de la ruta que tiene 
// muchos metodos para acceder a ellas
var router = express.Router(); 

// MIDDLEWARE -> Algo q se ejecuta antes que se ejecute el metodo o accion del controlador
// Configurar el middleware que contiene el multiparty
var multipart = require('connect-multiparty');
// donde se va a guardar las imagenes subidas
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Creamos las rutas get

// Dirige al metodo home creado en el controller 
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
// Registrar proyecto/documento
router.post('/save-project', ProjectController.saveProject);
// Listar proyecto por ID
// :id?, -> parametro opcional configurado en controllers
router.get('/project/:id?', ProjectController.getProject);
// Listar los proyectos de la Base de datos 
router.get('/projects', ProjectController.getProjects);
// Actualizar proyectos de la BD
router.put('/project/:id', ProjectController.updateProject);
// Eliminar un proyecto de la BD
router.delete('/project/:id', ProjectController.deleteProject);
// Subir imagenes
// Para poner un middleware en la ruta, la pasamos como parametro
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
// Ruta para devolver imágenes
router.get('/get-image/:image', ProjectController.getImageFile);


// Exportamos la variable router con toda la configuracion de rutas
// para utilizarlo en cualquier otro archivo 
module.exports = router;

