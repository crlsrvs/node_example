/* En este ejemplo se explicara como se recibe la informacion desde un request y por donde pasa, en este caso sera texto   */

// Objeto para el modulo "querystring"
// Este modulo provee utilidades para parsear y formatear "URL query strings"  
// ( Ejemplo: "foo=bar&abc=xyz" con el metodo "parse" se convertiria en {foo: 'bar', abc: 'xyz'} )
var querystring = require("querystring");

// Fs es el modulo para llamar la imagen dentro del servidor y mostrarla
var fs = require("fs");

//metodo a ejecutar al redireccionar a la ruta "iniciar"
function iniciar(response, postData) {
  console.log("Manipulador de petición 'iniciar' fue llamado.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/subir" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    //Respuesta para esta ruta
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

// Metodo para "subir"
// El metodo "parse" convierte una "URL query string" en un vector del tipo {campo: 'valor', campo2: 'valor2'}
// el "["text"]" hace referencia al campo "text" y retorna su valor,  (es "text" porque asi es como se envia en el formulario)
function subir(response, dataPosteada) {
    console.log("Manipulador de peticion 'subir' fue llamado.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Tu enviaste el texto: " + querystring.parse(dataPosteada)["text"]);
    response.end();
}

// Metodo para mostrar la imagen
function show(response){
    console.log("Request handler 'show' fue llamado.");
    response.writeHead(200, {"Content-Type": "image/png"});

    //Este es el metodo que muestra la imagen desde el browser
    fs.createReadStream("tmp/test.png").pipe(response);
}


exports.iniciar = iniciar;
exports.subir = subir;
exports.show = show;