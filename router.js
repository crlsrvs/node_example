// Funcion que se encarga del routeo
function route(handle, pathname, response, postData) {

	console.log("A punto de rutear una peticion para " + pathname);
	
	// Primero evalua si la ruta pasada por parametro (pathname) existe como campo dentro de array (handle)
	// de ser asi verifica si su valor es una funcion  
	if (typeof handle[pathname] === 'function') {
		
		// En caso de ser así, llama a la funcion correspondiente con la ruta y le envia por parametro 
		// el objeto de respuesta y la data post recibida
		handle[pathname](response, postData);

	// Caso contrario:
	} else {
		
		console.log("No se encontro manipulador para " + pathname);
		
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 No Encontrado");
		response.end();
	}
}

exports.route = route;