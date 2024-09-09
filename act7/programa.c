/* 
Basic example of sending a SMS with Twilio and a Particle Photon.

Author: Paul Kamp, Twilio Developer Education
License: MIT
*/

String body = "Hola, soy Tulio Triviño en la Particle Photon";
bool flag = false;

void setup() {
  Particle.function('twilio_sms', body);
  Particle.function('flag', flag);
  Serial.begin(115200);
}

void loop() {
    Serial.println("That's all!  You can restart or edit the code now.");
    if(flag){
        Particle.publish("twilio_sms", body, PRIVATE);
        flag = false;
    }
    delay(1000);
}