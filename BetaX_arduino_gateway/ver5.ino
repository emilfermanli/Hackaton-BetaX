#include <Arduino.h>
#include <SoftwareSerial.h>
SoftwareSerial myGsm(7,8);
float temp;
int sensorData [32] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25};
String starter = "1,";
String id = "BetaXHackatrone2020,";
String password = "z$38rP?ap6Uc;3~C@>t&w'P7,";
String terminator = "*";
void printSerialData()
{
 while(myGsm.available()!=0)
 Serial.write(myGsm.read());
}

void sendData()
{
String strSensorData = "";
for(int i=0;i<24;i++){
 strSensorData = strSensorData + "," + String(sensorData[i]);
}
/*
String strSensorData = String(sensorData[0]) + "," + String(sensorData[1]) + "," + String(sensorData[3]) + "," + String(sensorData[4]) + "," + String(sensorData[5]) + "," + String(sensorData[6]) + "," + String(sensorData[7]) + "," +
String(sensorData[8]) + "," + String(sensorData[9]) + "," + String(sensorData[10]) + "," + String(sensorData[11]) + "," + String(sensorData[12]) + "," + String(sensorData[13]) + "," + String(sensorData[14]) + "," + String(sensorData[15]) + "," +
String(sensorData[16]) + "," +String(sensorData[17]) + "," +String(sensorData[18]) + "," +String(sensorData[19]) + "," + String(sensorData[20]) + "," + String(sensorData[21]) + "," + String(sensorData[22]) + "," + String(sensorData[23]) + "," + 
String(sensorData[24]) + ",";
*/
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
