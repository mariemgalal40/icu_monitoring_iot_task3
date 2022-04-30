//Code for master module//

#include <ESP8266WiFi.h>  
#include <string.h>               
#include <FirebaseArduino.h>      
#define FIREBASE_HOST "icytask-2f3ed-default-rtdb.firebaseio.com"      
#define FIREBASE_AUTH "HIhdq6YthXoxYNZoxU2nSr15B9ZjUT3tBjLZcY4C"            
#define WIFI_SSID "Mariem"                                  
#define WIFI_PASSWORD "suut5593"


int dataFromSlave1 = 0;
int dataFromSlave2 = 0;
int n;
void setup() {

  Serial.begin(9600); // Default baud rate of the Bluetooth module
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                 // connect to the firebase 
//  Firebase.set("status",0); 
}
void loop() {
 n=Firebase.getInt("status/status");  
  if (n==1) { 
   Firebase.setFloat("/temp",0);
   Firebase.setFloat("/hum",0);
   Firebase.pushString("/t", "0");
   Firebase.pushString("/h", "0");
   Serial.write("1");  
  }  
   else{   
   Serial.write("0");  
   if(Serial.available() > 0){ // Checks whether data is comming from the serial port
   dataFromSlave1 = Serial.read(); // Reads the data from the serial port and store it in dataFromSlave variable
   Firebase.setFloat("/temp",dataFromSlave1);
   String t = String(dataFromSlave1) ;
   Serial.print(dataFromSlave1);
   dataFromSlave2 = Serial.read();
   Firebase.setFloat("/hum",dataFromSlave2);
   String h = String(dataFromSlave2) ;
   delay(10000);   
   Firebase.pushString("/h", t);
   Firebase.pushString("/t", h);
   Serial.println(dataFromSlave2);
       
   if (Firebase.failed()) 
    {
      Serial.print("pushing /logs failed:");
      Serial.println(Firebase.error()); 
  }  
 }
 }
}
