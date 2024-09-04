var particle = new Particle();
var token;
//Crear token de acceso con nuestras credenciales de Particle
particle.login({username: 'cnolazco@ucol.mx', password: 'patapon3'}).then(
  function(data) {
    token = data.body.access_token;
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);

setInterval(function() {
  //Conseguir elemento Switch que nos servirá para controlar el led
  var switchToogle = document.getElementById('switch');
  //Función que se ejecuta cada vez que se manipula el switch
  switchToogle.onclick = function() {
    //Conseguir elemento icono que nos servirá para cambiar el icono de bombilla
    var output = document.getElementById('state1');
    //Crear una variable donde se almacenará un dato u otro dependiendo del estado del switch
    var Salida1 = switchToogle.checked ? 'on' : 'off';
    //Asignar un icono diferente dependiendo del estaod del switch
    Salida1 == 'on' ? output.innerText = 'Lightbulb' : output.innerText = 'Light_Off';
    
    //Función que mandará un dato u otro dependiendo del estado del switch
    switch (Salida1) {
      //Mandar un 1 en caso de estar encendido
      case 'on':
        console.log("Encendido");
        console.log(Salida1);
        particle.callFunction({ deviceId: '0a10aced202194944a05a06c', name: 'led', argument: '1', auth: token });
        break;
      //Mandar un 0 en caso de estar apagado
      case 'off':
        console.log("Apagado");
        console.log(Salida1);
        particle.callFunction({ deviceId: '0a10aced202194944a05a06c', name: 'led', argument: '0',auth: token });
        break;
      //Imprimir un mensaje de error en caso de que no se detecte el switch
      default:
        console.log('Desconocido');
    }
  }
}, 1000);