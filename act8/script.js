var particle = new Particle(); //Creamos una nueva instancia de Particle
var token; //Variable donde se almacenará el token de acceso
particle.login({ username: 'correo@particle.com', password: 'contraseña' }).then( //Ingresamos con nuestras credenciales
  function (data) { //Obtenemos todos los datos del inicio de sesión
    token = data.body.access_token; //Guardamos el token de acceso
    console.log('Acceso exitoso'); //Hacemos saber al usuario que todo salió bien
  },
  function (err) { //Manejamos los errores
    console.log('Error al iniciar sesión.', err); //Hacemos saber al usuario que todo salió mal y le mostramos el error
  }
);

var ca = 0; //Variable donde se almacenará la información obtenida
var mensaje = "Conectando..."; //Mensaje que se enviará al cliente, contiene un mensaje por defecto
setInterval(function () { //Función que se ejecuta cada 2 segundos para consultar las variables de Particle
  particle.getVariable({ deviceId: 'idDelDispositivo', name: 'irms', auth: token }).then(function (data) { //Obtenemos la variable de Particle
    console.log('Variable obtenida correctamente:', data); //Si todo salió bien mostramos el contenido obtenido
    ca = Number(data.body.result); //Guardamos la variable de particle en una variable local y la convertimos a numero

    mensaje = "La corriente registrada es de: " + ca.toFixed(2); //Actualizamos el mensaje que mandaremos al cliente, añadimos la variable con dos decimales

  }, function (err) { //Manejamos cada posible error y mandamos un mensaje dependiendo de que haya pasado
    if (err.statusCode === 404) {
      mensaje = "Dispositivo no encontrado. Verifica la conexión de la tarjeta.";
    } else if (err.statusCode === 408) {
      mensaje = "Error de tiempo de espera. Puede que la tarjeta no esté conectada a internet.";
    } else if (err.statusCode === 401) {
      mensaje = "Error de autenticación. El token no es válido o ha caducado.";
    } else {
      mensaje = "Ocurrió un error al obtener la variable: " + err;
    }
  });
  console.log(mensaje); //Mostramos por terminal el mensaje que será enviado
  enviarMensaje(mensaje); //Enviamos el mensaje
}, 2000); //Esperamos dos segundos antes de ejecutar la función nuevamente

let xmpp; //Creamos la variable de conexión con el servidor XMPP

const username = 'photon'; //Usuario con el que iniciará sesion este cliente
const pass = '1234'; //Contraseña con la que iniciará sesion este cliente

xmpp = window.XMPP.client({ //Inicializamos las configuraciones de conexión con el servidor
  service: 'ws://localhost:5280/ws', //Ruta del servidor
  domain: 'localhost', //Dominio del servidor Ejabberd
  username: username, //Nombre de usuario
  password: pass, //Contraseña del usuario
  resource: 'ca' //Un recurso arbitrario, puede ser cualquier cosa
});

xmpp.on('online', (address) => { //Inicializamos el estado del usuario en "Online"
  console.log('Conectado como: ' + address.toString()); //Hacemos saber al usuario que se logueó correctamente
});

xmpp.on('stanza', (stanza) => { //Inicializamos la recepción de mensajes
  console.log('Stanza recibida:', stanza.toString());  // Log para depurar la stanza completa
  if (stanza.is('message') && stanza.getChild('body')) { //Verificamos la integridad de las stanzas recibidas
    const cuerpo = stanza.getChildText('body'); //Obtenemos el mensaje contenido en la stanza
    console.log('Mensaje recibido: ' + cuerpo); //mostramos por terminal el mensaje de la stanza
    mostrarMensaje(cuerpo); //Mostramos mediante la interfaz web el mensaje recibido
  }
});

xmpp.on('error', (err) => { //Manejamos errores de XMPP
  console.error('Error:', err); //Mostramos los errores al usuario
});

xmpp.start().catch(console.error); //Iniciamos la conexión XMPP

function enviarMensaje(msg) { //Función encargada de enviar mensajes a otros clientes, recibe como parametro una cadena de texto que será enviada
  if (!xmpp) { //Verifica que exista una conexión XMPP
    console.error('No estás conectado al servidor XMPP.'); //Hacemos saber al usuario que no está conectadp
    return; //Terminamos la ejecución de la función
  }

  const mensaje = msg == null ? document.getElementById('mensaje').value : msg; //Asignamos el mensaje a una variable local de la función, si no se escribió ningún mensaje, entonces se puede escribir uno desde el input de texto que está en la interfaz HTML
  const destinatario = "cliente@localhost"; //Cliente al que se enviará el mensaje

  if (!mensaje || !destinatario || !destinatario.includes('@')) { //Verificamos la correcta estructura del mensaje y del destinatario
    alert('Por favor, ingresa un mensaje válido y un destinatario.'); //Hacemos saber al usuario que ingresó datos erroneos
    return; //Terminamos la ejecución de la función
  }

  const message = window.XMPP.xml( //Creamos la stanza que se enviará a través del protocolo XMPP
    'message', //Tipo de stanza a enviar
    { type: 'chat', to: destinatario }, //Modo de despliegue y destinatario
    window.XMPP.xml('body', {}, mensaje)); //Cuerpo del mensaje

  console.log('Mensaje enviado:', message.toString()); //Ver el mensaje antes de enviarlo

  xmpp.send(message).catch(console.error); //Enviar mensaje y verificar si hay errores
}

function mostrarMensaje(mensaje) { //Función para mostrar mensajes recibidos
  const listaMensajes = document.getElementById('mensajesRecibidos'); //Obtenemos el elemento donde se listarán los mensajes
  const nuevoMensaje = document.createElement('li'); //Creamos un nuevo elemento en la lista
  nuevoMensaje.textContent = mensaje; //Agregamos el contenido del mensaje al elemento creado
  listaMensajes.appendChild(nuevoMensaje); //Mostramos el elemento en la interfaz HTML
}