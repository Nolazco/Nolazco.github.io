// Author: Nolazco Lagunas Carlos

SYSTEM_THREAD(ENABLED); // for running with/without internet conection
#include "math.h"  // libreria para funciones matematicas
#include "stdio.h" // libreria estándar de entradas salidas

// This routine runs only once upon reset

void setup(){
	Particle.function("TMS_2",tms_2); // The TMS parameter can be settled in external way from Particle cloud
}

float TMS; // Time multiplier setting function
int tms_2(String command) {
	TMS = atof(command);
	return TMS;
}

// This routine loops forever
void loop(){
	float Value=5; // initial value of Value
	Value=TMS*Value; // Value is multiplied by TMS
	String VALOR = String(Value);
	Particle.publish("VALOR",VALOR, PRIVATE);
	delay(2000);
}