#include <Arduino.h>
#include <SoftwareSerial.h>
#include <LoRa.h>
SoftwareSerial myGsm(7,8);
float temp;
int sensorData [32] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25};
String starter = "1,";
String id = "BetaXHackatrone2020,";
String password = "z$38rP?ap6Uc;3~C@>t&w'P7,";
String terminator = "*";
String LoRaReceived[32] = "";
void printSerialData()
{
 while(myGsm.available()!=0)
 Serial.write(myGsm.read());
}

void sendDataGPRS()
{
String strSensorData = "";
for(int i=0;i<24;i++){
 strSensorData = strSensorData + "," + String(sensorData[i]);
}

String dataPacket = (starter + id + password + strSensorData + terminator);

//myGsm.print("1,BetaXHackatrone2020,z$38rP?ap6Uc;3~C@>t&w'P7,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27");
myGsm.print(dataPacket);
Serial.println();
 delay(5000);
 printSerialData();
 myGsm.write(0x1A);
 delay(5000);
 printSerialData();
}
void configureGsm(){
myGsm.println("AT+CIPSHUT");
 delay(1000);
 printSerialData();

 myGsm.println("AT+CIPMUX=0");
 delay(2000);
 printSerialData();
 
 myGsm.println("AT+CGATT=1");
 delay(1000);
 printSerialData();
 
  
 myGsm.println("AT+CSTT=\"nar\",\"\",\"\"");//setting the APN,2nd parameter empty works for all networks 
 delay(5000);
 printSerialData();
 
 myGsm.println();
 myGsm.println("AT+CIICR");
 delay(6000);
 printSerialData();
 
 myGsm.println("AT+CIFSR"); //init the HTTP request
 delay(2000); 
 printSerialData();
 
 myGsm.println("AT+CIPSTART=\"TCP\",\"64.227.107.166\",\"8080\"");
 delay(5000);
 printSerialData();
 delay(5000);
 
 myGsm.println("AT+CIPSEND");
 delay(2000);
 printSerialData();

sendDataGPRS();
delay(3000);
myGsm.println("AT+CIPCLOSE");
printSerialData();

myGsm.println("AT+CIPSHUT");
delay(1000);
printSerialData();
}

void setup()
{
 myGsm.begin(9600);  
 Serial.begin(9600);  
   if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
 delay(500);
}
void receiveDataLoRa(){
int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");

    // read packet
    while (LoRa.available()) {
    (char)LoRa.read();
    }
    // print RSSI of packet
    Serial.print("' with RSSI ");
    Serial.println(LoRa.packetRssi());
  }
}
void loop()
{
configureGsm();
receiveDataLoRa();
sendDataGPRS();
}
