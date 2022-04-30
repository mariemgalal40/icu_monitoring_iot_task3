//Code for Slave module//

#define ledPin 8
#include "DHT.h"

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);
//#define slaveSwitchPin 7
int dataFromMaster = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
//  pinMode(slaveSwitchPin, INPUT);
//  digitalWrite(slaveSwitchPin,LOW);
  Serial.begin(9600); // Default baud rate of the Bluetooth module
  dht.begin();
}
void loop() {
  delay(1000);
  int h = dht.readHumidity();
  int t = dht.readTemperature();
  Serial.write(h);
  Serial.write(t);

 if(Serial.available() > 0){ // Checks whether data is comming from the serial port
   dataFromMaster = Serial.read(); // Reads the data from the serial port and store it in dataFromMaster variable   
 }
 // Controlling the led
 if (dataFromMaster == '1') {
  digitalWrite(ledPin, HIGH); // LED ON
 }
 else if (dataFromMaster == '0') {
  digitalWrite(ledPin, LOW); // LED    OFF
 }
}
