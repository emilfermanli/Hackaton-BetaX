#include <Arduino.h>
#include <SoftwareSerial.h>
SoftwareSerial myGsm(7,8);
float temp;
//debug uchun
int int1 = 25;
int int2 = 19;
void printSerialData()
{
 while(myGsm.available()!=0)
 Serial.write(myGsm.read());
}

void sendData()
{
String dataPacket = (String(int1) + "," + String(int2) + "*");
 myGsm.print("*");
 myGsm.println();
 delay(5000);
 printSerialData();
 myGsm.write(0x1A);
 delay(5000);
 printSerialData();
}

void setup()
{
 myGsm.begin(9600);  
 Serial.begin(9600);  
 delay(500);
int1++;
int2++;
if(int1 >255){
int1 = 0;
int2 = 0;
}
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

void loop()
{
sendData();
}
