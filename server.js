// Se asocia la variable "http" al módulo "http" que viene incluido con Node.js 
var http = require("http");

// Se asocia el modulo "url" a la variable "url"
var url = require("url");

// Funcion que inicia el servidor, recibe como parametro la funcion "route" y el array "handle" enviados desde el index 
function iniciar(route, handle) {

	// Esta es la funcion que se activa al hacer una peticion al servidor, recibe en "request" los parametros de ruta y peticiones
	// El objeto "response" es el encargado de retornar una respuesta dependiendo la situacion 
	function onRequest(request, response) {

		// Variable que almacenará el conjunto total de la informacion Post recibida en la peticion
		var dataPosteada = "";

		// "url.parse()" convierte un URL string (request.url) en un URL Object (un array asociativo)
		// De este URL Object se saca el valor del campo "pathname" ( un ejemplo seria: { pathname: "/ruta" } ) 
		var pathname = url.parse(request.url).pathname;
		console.log("Peticion para " + pathname + " recibida.");

		// Se define el request como una cadena codificada en utf8, sino el request sera un buffer object
		request.setEncoding("utf8");

		// Al momento de recibir la informacion, para hacer el proceso completo no bloqueante, Node.js le entrega a nuestro código 
		// la información POST en pequeños trozos con callbacks que son llamadas ante determinados eventos.

		// Este listener se activara para el evento "data" (cada vez que se reciba un pedazo de informacion)
		// este pedazo de informacion se almacenara en "trozoPosteado" y se le pasara como parametro a una funcion
		request.addListener("data", function(trozoPosteado) {

			//Con cada trozo de informacion que se reciba se ira acumulando en la variable "dataposteada"
			dataPosteada += trozoPosteado;
			console.log("Recibido trozo POST '" + trozoPosteado + "'.");
		});

		// Este listener se activara para el evento "end" (cuando toda la informacion se haya recibido)
		// Se manda al router: el array de Ruta/Handler, la ruta, el objeto para la respuesta, la data recibida
		request.addListener("end", function() {
			route(handle, pathname, response, dataPosteada);
		});
		
	}

	// "createServer" es una de las funciones que el módulo http ofrece. Esta función retorna un objeto, y este objeto posee 
	// un método llamado listen y toma un valor numérico que indica el número de puerto en que nuestro servidor HTTP va a escuchar.
	// El primer parametro del metodo "createServer" es una funcion, y esta es la que sera ejecutada cuando reciba peticiones.
	// En JavaScript, las funciones pueden ser pasadas de un lado a otro como cualquier otro valor.
	http.createServer(onRequest).listen(8888);
	console.log("Servidor Iniciado.");
}

//exports permite exportar la funcion iniciar, definiendo server.js como un modulo
exports.iniciar = iniciar;



