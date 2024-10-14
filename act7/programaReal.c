SYSTEM_THREAD(ENABLED);      // Ejecuta el codigo aun sin internet
#include <Adafruit_Sensor.h> //Libreria para manejar diversos tipos de sensores
#include <DHT.h>             //Importar libreria para el sensor DHT11
#define DHTPIN 2             // Declara el pin que se usara para leer el sensor
#define DHTTYPE DHT11        // Declara el tipo de sensor que se usara

DHT dht(DHTPIN, DHTTYPE); // Creamos el objeto del sensor
int temp, humidity; // Creamos variables para almacenar temperatura y humedad

void setup() { // Funcion que se ejecuta cada vez que se enciende la tarjeta
  Serial.begin(9600); // Inicializa un puerto serial para la consola
  dht.begin();        // Inicializamos el sensor
}

void loop() { // Funcion que se ejecuta cada ciclo del procesador
  humidity = dht.readHumidity(); // Leemos la humedad mediante el sensor
  temp = dht.readTemperature();  // Leemos la temperatura mediante el sensor
  temp = random(20, 40);
  humidity = random(20, 80);

  Particle.publish("telemetry_temp", String(temp)); // Publicamos la variable de la temperatura
  Particle.publish("telemetry_humidity", String(humidity)); // Publicamos la variable de la humedad

  delay(10000); // Esperamos 10 segundos antes de volver a ejecutar la actividad
}