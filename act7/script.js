var particle = new Particle(); //Crea una nueva instancia de Particle
var token; //Crea la variable que almacenará el token de acceso
var result = 0; //Creamos una variable para almacenar el resultado
var resultLabel = document.getElementById("result"); //Obtenemos el elemento en el cual se mostrará el resultado
particle.login({ username: 'cnolazco@ucol.mx', password: 'patapon3' }).then( //Creamos el token de Particle con nuestras credenciales
  function (data) {
    token = data.body.access_token;
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);

function sendMessage(){
  var message = document.getElementById('message').value.concat("&true");
  console.log(message);
  particle.callFunction({ deviceId: '0a10aced202194944a05a06c', name: 'sendSMS', argument: message, auth: token, })
};