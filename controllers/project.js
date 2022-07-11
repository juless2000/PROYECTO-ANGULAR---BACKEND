/* CONTROLADOR DE LOS PROYECTOS 
	- Va a ser una especie de clase que va a tener una serie de metodos
	o acciones que va a poder hacer relacionados con la entidad de proyectos.
*/

'use strict'

// Importamos el modelo para hacer instancias 
var Project = require('../models/project');
// Importamos la libreria FileSystem para eliminar la imagen mal subida
var fs = require('fs');
// path -> modulo de js que nos permite cargar rutas fisicas de nuestro sistema de archivo
var path = require('path');

var controller = {
	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		})
	},

	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo test del controlador de project'
		})
	},

	// Metodo para guardar documentos
	saveProject: function(req, res){
		// Creamos un objeto de Proyecto
		var project = new Project();

		// setear un valor a la propiedad enviando por POST
		// En insomnia para probar utilizo el query
		// Para probar desde el Front utilizo req.body 
		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		// guardar el proyecto en la BD
		// save -> Tiene una funcion de callback que recibe un error o un projecStored
		project.save((err, projectStored) => {
			// Si hay algun error, enviar una res de status 500 con un mensaje
			if (err) return res.status(500).send({message: 'Error al guardar'});
			// Si no se guarda el projectStored/ no existe esa variable en la BD, enviar un status 404 
			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

			// En caso todo vaya bien, devolvemos el projecStored
			return res.status(200).send({project: projectStored});
		}) 

		/*
		return res.status(200).send({
			project: project,
			message: 'Metodo saveProject'
		})
		*/
	},

	// Listar proyectos de una peticion get 
	getProject: function(req, res){
		var projectId = req.params.id;

		// Para el parametro opcional
		if (projectId == null) {
			return res.status(404).send({ message: 'El proyecto no existe.'});
		}

		// Buscar un objeto cuyo id sea el que le pase
		// metodo de mongoose
		Project.findById(projectId, (err, project) => {
			// Si da error
			if(err) return res.status(500).send({ message: 'Error al devolver los datos.'});
			// Si el objeto llega vacio o malo
			if(!project) return res.status(404).send({ message: 'El proyecto no existe.'});
			// que retorne el project con los datos
			return res.status(200).send({
				project
			}); 
		});
	},

	// Listar los proyectos que tenemos en la Base de datos
	getProjects: function(req, res){
		// Llamar a nuestro modelo Project
		// find -> saca todos los documentos q hay dentro de una entidad
		// exec -> cuando ya nos saque el resultado, que se ejecute el metodo 
		// sort('year') -> ordenar por año
		Project.find({}).sort('year').exec((err, projects) => {
			// Si da error
			if(err) return res.status(500).send({ message: 'Error al devolver los datos.'});
			// si el proyecto no existe o es null
			if(!projects) return res.status(404).send({ message: 'No hay proyectos para mostrar.'});
			// si todo va bien, q devuelva los datos(projects)
			return res.status(200).send({projects});
		});	 
	},

	// Actualizar un proyecto de la BD
	updateProject: function(req, res){
		// Recoger un param por la url para saber cual actualizar
		var projectId = req.params.id;
		// actualizar/sustituir los datos correspondientes
		var update = req.body;
		// findByIdAndUpdate -> metodo de mongoose para buscar/actualizar x ID
		// {new:true} -> para que me devuelva los datos actualizados en el json del insomnia
		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
			if(err) return res.status(500).send({ message: 'Error al actualizar.'});

			if(!projectUpdated) return res.status(404).send({ message: 'No existe el proyecto para actualizar.'});
		
			return res.status(200).send({ project: projectUpdated });
		})
	},

	// Eliminar un proyecto
	deleteProject: function(req, res){
		// recogemos el ID del documento
		var projectId = req.params.id;
		// findByIdAndDelete -> busca el Id del documento y lo elimina
		Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
			if(err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto'}); 

			if(!projectDeleted) return res.status(404).send({ message: 'No se puede eliminar el proyecto.'});

			return res.status(200).send({ project: projectDeleted })
		})
	},

	// Subir imagenes con el Connect Multiparty 
	uploadImage: function(req, res){
		// Recoger el Id sobre el cual se va a guardar la imagen
		var projectId = req.params.id;
		var fileName = 'Imagen no subida';

		// Con el connect-multiparrty recogemos ficheros por la request
		// El el caso de q exista todos los archivos q vaya subiendo
		// req.files -> contiene las propiedades de las imag subidas
		if(req.files){

			// Sacar valores para guardar la img en la BD

			// Sacamos la propiedad path del archivo suvido
			var filePath = req.files.image.path;
			// Recortamos lo q contiene el path a partir de las barras para 
			// sacar el nombre de la img
			var fileSplit = filePath.split('\\');
			// Recogemos el indice 1 que es el nombre del archivo
			var fileName = fileSplit[1];

			// VALIDAR QUE LA EXTENSION DE LAS IMAGNES SEAN CORRECTAS

			// Sacar la extension de nuestro archivo
			var extSplit = fileName.split('\.');
			// Recogemos el nombre de la extension
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
				// 	
				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
				
					if(err) return res.status(500).send({ message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe.' });

					// que retorne el json con las propiedades 
					return res.status(200).send({ project : projectUpdated })
				})

			}else {
				// que borre el archivo, para eso utilizamos la libreria Fs de nodejs
				// Le pasamos el filepath completo para que borre el archivo
				fs.unlink(filePath, (err) => {
					return res.status(200).send({ message: 'La extension no es válida'});
				})
			}

			



		}else {
			return res.status(200).send({ message : fileName })
		}
	},

	// Metodo para devolver imágenes
	getImageFile: function(req, res){
		// nombre del archivo
		var file = req.params.image;
		// ruta del archivo
		var path_file = './uploads/' + file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: 'No esxiste la imagen...'
				})
			}
		})


	}


};

// Utilizar los metodos del controller fuera del archivo
module.exports = controller; 