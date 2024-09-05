// Autor: Nolazco Lagunas Carlos

SYSTEM_THREAD(ENABLED); // Ejecutar programa sin conexión a internet
#include "math.h"  // libreria para funciones matematicas
#include "stdio.h" // libreria estándar de entradas salidas

String VALOR;

void setup(){ //Función que se ejecuta cada vez que se enciende la tarjeta
	Particle.function("TMS_2",tms_2); //Crea la variable que se recibirá en la nube de Particle
	Particle.variable("result", VALOR);
}

float TMS; //Variable que usaremos para realizar las operaciones
int tms_2(String command) { //función que transforma la variable recibida de texto a flotante
	TMS = atof(command); //Convierte valores de texto a flotante
	return TMS; //Devuelve el valor convertido
}

void loop(){ //Código que se repite cada ciclo de reloj de la Particle
	float Value=5; //Valor inicial de la variable
	Value=TMS*Value; //Realizamos la operación y guardamos el resultado en otra variable
	VALOR = String(Value); //convertimos el valor 
	Particle.publish("VALOR",VALOR, PRIVATE); //Muestra el valor obtenido en la terminal de eventos de Particle
	delay(2000); //Espera dos segundos antes de volver a ejecutar el código
}