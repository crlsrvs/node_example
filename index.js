/* En este ejemplo se explicara como mostrar una imagen desde los archivos del servidor   */

// Se trae el modulo del servidor y lo asocia a la variable server, de manera que esta variable puede usar los metodos que el modulo exporta
var server = require("./server");

//Igual que con el modulo del servidor pero esta vez es relativo a las rutas
var router = require("./router");

//Se trae el modulo para el manejo de las peticiones
var requestHandlers = require("./requestHandlers");

//Se crea el array que asocia las rutas con los handlers correspondientes
var handle = {}
handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/subir"] = requestHandlers.subir;
handle["/show"] = requestHandlers.show;

//Al iniciar el servidor se le pasa por parametro la funcion route del objeto router y el array que asocia las rutas con los handlers
server.iniciar(router.route, handle);