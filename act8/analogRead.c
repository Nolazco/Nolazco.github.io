#include "math.h" // libreria para funciones matematicas
#include "stdio.h" // libreria estándar de entradas salidas
#define FACTOR 48.2; //factor de conversion de volts a amperes

String IRMS;

void setup() {
    
}

void loop() { // codigo que se repetirá de manera continua
  float Irms = 0; //variable en la que se almacenaran las lecturas
  for (int i = 0; i <= 99; i++) {// se leen 100 muestras para obtener el valor rms
    float Ia = analogRead(A3); // Lectura de la entrada analógica del pin 0 
    
    //Conversion a valor analogico
    Ia = ((Ia / 4096) * 3.3 - 1.65) * FACTOR; // el factor es la conversión de volts a amperes.
    Irms = Irms + pow(Ia, 2); // se acumulan los cuadrados de cada muestra de corriente
    delay(1); // Una muestra cada 1 milisegundo
  }

  Irms = sqrt(Irms / 100); // se obtiene la raíz cuadrada entre el numero de muestras
  Irms = random(1, 10);
  IRMS = String(Irms); // se convierte a cadena de caracteres el valor numérico del valor rms
  Particle.variable("irms", IRMS); //Se crea la variable que será recibida desde el cliente
    Particle.publish("Corriente", IRMS); // se publica el valor en la plataforma de Particle con el nombre de “Corriente”
  delay(2000); // El valor rms se actualizara cada 2 segundos, Particle permite publicar hasta 1 segundo como mínimo.
}