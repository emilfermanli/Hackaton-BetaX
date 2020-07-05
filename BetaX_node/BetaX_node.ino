#include <Arduino.h>
#include <SPI.h>
#include <DHT.h>
#include <LoRa.h>
#include <DallasTemperature.h>
#include <OneWire.h>

#define DHTPIN 7
#define DHTTYPE DHT11   
#define trigPin 5
#define echoPin 6
#define SalinityPin A1 //duzluluq olcmek uchun pin 
#define BlurringPin A0 //suyun bulaniqliq olcmek uchun pin 

#define ONE_WIRE_BUS 4

float humidity = 0;
float waterTemperature = 0;
float airTemperature = 0;

int distance = 0;
int duration = 0;
int salinityOfWater = 0;
int blurringOfWater = 0;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
   Serial.begin(9600);
   dht.begin();
    sensors.begin();
   pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
   pinMode(echoPin, INPUT); // Sets the echoPin as an Input
   if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}
void readDHT(){
   humidity = dht.readHumidity();
   airTemperature = dht.readTemperature();// Read temperature as Celsius (the default)
}
void readDallas(){
sensors.requestTemperatures(); 
waterTemperature = sensors.getTempCByIndex(0);
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
void testSensors(){//only for debug
 Serial.print("Hava Temperatur: ");
 Serial.print(airTemperature);
 Serial.print("Su Temperatur: ");
 Serial.print(waterTemperature);
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
void sendLora(){
LoRa.beginPacket();
LoRa.print('#');
LoRa.print('A');
 LoRa.print(airTemperature);
 LoRa.print(",");
 LoRa.print('W');
  LoRa.print(waterTemperature);
  LoRa.print(",");
 LoRa.print('H');
 LoRa.print(humidity);
 LoRa.print(",");
 LoRa.print('L');
 LoRa.print(readWaterLevel());
 LoRa.print(",");
 LoRa.print('B');
 LoRa.print(blurringOfWater);
 LoRa.print(",");
  LoRa.print('S');
 LoRa.print(salinityOfWater);
 LoRa.print(",");
 LoRa.println();
LoRa.endPacket();
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
readDallas();
sendLora();
}
