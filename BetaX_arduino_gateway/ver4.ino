#include <Arduino.h>
#include <SoftwareSerial.h>
SoftwareSerial myGsm(7,8);
float temp;
int sensorData [32] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25};
String id = "BetaXHackatrone2020,";
String password = "z$38rP?ap6Uc;3~C@>t&w'P7,";
String terminator = ",*";
void printSerialData()
{
 while(myGsm.available()!=0)
 Serial.write(myGsm.read());
}

void sendData()
{
String strSensorData = "/0";

for(int i=0;i<24;i++){
 strSensorData = strSensorData + "," + String(sensorData[i]);
}

String dataPacket = (password + id + strSensorData + terminator);
 myGsm.print(dataPacket);
 myGsm.println();
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

sendData();
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
 delay(500);
}

void loop()
{
configureGsm();
sendData();
}
