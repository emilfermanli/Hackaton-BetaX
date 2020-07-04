#include <Arduino.h>
#include <SPI.h>
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11   
#define trigPin 9
#define echoPin 10
#define SalinityPin A0 //duzluluq olcmek uchun pin 
#define BlurringPin A1 //suyun bulaniqliq olcmek uchun pin 
float humidity = 0;
float temperature = 0;

int distance = 0;
int duration = 0;
int salinityOfWater = 0;
int blurringOfWater = 0;

DHT dht(DHTPIN, DHTTYPE);
void setup() {
   Serial.begin(9600);
   dht.begin();
   pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
   pinMode(echoPin, INPUT); // Sets the echoPin as an Input
}
void readDHT(){
   humidity = dht.readHumidity();
   temperature = dht.readTemperature();// Read temperature as Celsius (the default)
}
int readWaterLevel(){
digitalWrite(trigPin, LOW);
delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);
// Calculating the distance
distance= duration*0.034/2;
return distance;
}
int ReadSalinityOfWater(){
  salinityOfWater = map(analogRead(SalinityPin),0,1024,0,1000);
  return salinityOfWater;
}
int ReadBlurringOfWater(){
 blurringOfWater =  map(analogRead(BlurringPin),0,1024,1,100);
 return blurringOfWater;
}
void testSensors(){
 Serial.print("Temperatur: ");
 Serial.print(temperature);
 Serial.print("Humidity: ");
 Serial.print(humidity);
 Serial.print("Derinlik: ");
 Serial.print(readWaterLevel());
 Serial.print("Bulaniqliq: ");
 Serial.print(blurringOfWater);
 Serial.print("Duzluluq: ");
 Serial.print(salinityOfWater);
 Serial.println();
}
void readSensors(){
  ReadSalinityOfWater();
  ReadBlurringOfWater();
  readWaterLevel();
  readDHT();
}
void loop() {
  readSensors();
testSensors();
}
