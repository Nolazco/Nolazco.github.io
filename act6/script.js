var particle = new Particle();
var token;
particle.login({username: 'cnolazco@ucol.mx', password: 'patapon3'}).then(
  function(data) {
    token = data.body.access_token;
},
function (err) {
  console.log('Could not log in.', err);
});

setInterval(function() {
  Ktms.oninput = function() {
    var output = document.getElementById('Kvaluetms');
    output.innerHTML = this.value;
    var Salida=this.value;//
    particle.callFunction({ deviceId: '0a10aced202194944a05a06c', name: 'TMS_2', argument: Salida, auth: token, });
  }
  Ktms.oninput();
},1000);