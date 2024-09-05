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
  });

setInterval(function () { //Función que envia datos a la nube de Particle
  Ktms.oninput = function () { //Creamos la función que se ejecutará cada vez que se ingrese un valor
    var output = document.getElementById('Kvaluetms'); //Crea una instancia al elemento que mostrará el valor del slider
    output.innerHTML = this.value; //Muestra el valor del slider en texto
    var Salida = this.value; //Almacena el valor del slider en una variable
    particle.callFunction({ deviceId: '0a10aced202194944a05a06c', name: 'TMS_2', argument: Salida, auth: token, }); //Envia el valor del slider a la nube de particle
    particle.getVariable({ deviceId: '0a10aced202194944a05a06c', name: 'result', auth: token }).then(function (data) { //Función para obtener el resultado de la operación
      console.log('Device variable retrieved successfully:', data); //Mensaje de exito si el resultado fue conseguido
      result = data.body.result; //Guardamos resultado en una variable
      console.log(result); //Imprimimos el resultado en la terminal
      resultLabel.innerText = (new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 })).format(result); //Asignamos el texto del resultado a nuestro elemento
    }, function (err) { //Función que se ejecuta en caso de que falle la obtención
      console.log('An error occurred while getting attrs:', err); //Muestra cual fue el error
    });
  }
  Ktms.oninput(); //Llamamos la función cada que se cambie el valor del slider
}, 1000); //Espera 1 segundo antes de volver a ejecutar la función