var temp=0;
var hum=0;
var particle = new Particle();
var token;
particle.login({username: 'cnolazco@ucol.mx', password: 'patapon3'}).then(
    function(data) {
        token = data.body.access_token;
    },
    function (err) {
        console.log('Could not log in.', err);
    }
);

// Configuración inicial de la gráfica
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Etiquetas de tiempo (vacío inicialmente)
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: [], // Inicialmente vacío
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                tension: 0.1,
                pointRadius: 5, // Tamaño del punto
                pointHoverRadius: 7, // Tamaño del punto al pasar el cursor
            },
            {
                label: 'Humedad (%)',
                data: [], // Inicialmente vacío
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                tension: 0.1,
                pointRadius: 5, // Tamaño del punto
                pointHoverRadius: 7, // Tamaño del punto al pasar el cursor
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'time', // Escala de tiempo
                time: {
                    unit: 'minute' // Unidad de tiempo
                }
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                enabled: true, // Habilitar tooltip para mostrar valores
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue;
                    }
                }
            }
        }
    }
});

// Actualizar gráfica cada vez que se obtienen nuevos datos
setInterval(function() {
    particle.getVariable({ deviceId: '2e0033000b47313037363132', name: 'TEMP', auth:token }).then(function(data) {
        console.log('Device variable retrieved successfully:', data);
        temp=data.body.result;
    }, function(err) {
        console.log('An error occurred while getting attrs:', err);
    });
    particle.getVariable({ deviceId: '2e0033000b47313037363132', name: 'HUM', auth:token }).then(function(data) {
        console.log('Device variable retrieved successfully:', data);
        hum=data.body.result;
    }, function(err) {
        console.log('An error occurred while getting attrs:', err);
    });

    // Actualizar valores
    var Hum = hum.toFixed(2);
    var Temp = temp.toFixed(2);

    // Añadir nuevo punto de datos a la gráfica
    var now = new Date();
    myChart.data.labels.push(now); // Añadir la etiqueta de tiempo
    myChart.data.datasets[0].data.push(Temp); // Añadir la temperatura
    myChart.data.datasets[1].data.push(Hum); // Añadir la humedad

    // Limitar el número de puntos en la gráfica
    if (myChart.data.labels.length > 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
        myChart.data.datasets[1].data.shift();
    }

    // Actualizar la gráfica
    myChart.update();
}, 5000);