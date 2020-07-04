/Gateway test code/
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <String.h>
SoftwareSerial gprsSerial(2,3); //RX = 2, TX = 3

void setup()
{
  gprsSerial.begin(9600);               // set the gsm module baud rate   
  Serial.begin(9600);   
  delay(1000);
}
 void ShowSerialData()
{
  while(gprsSerial.available()!=0)
  Serial.write(gprsSerial.read());
  delay(5000); 
  
}
void loop()
{
  if (gprsSerial.available())
    Serial.write(gprsSerial.read());
 //GSM initial configure 
  gprsSerial.println("AT");
  delay(1000);
 
  gprsSerial.println("AT+CPIN?");
  delay(1000);
 
  gprsSerial.println("AT+CREG?");
  delay(1000);
 
  gprsSerial.println("AT+CGATT?");
  delay(1000);
 
  gprsSerial.println("AT+CIPSHUT");
  delay(1000);
 
  gprsSerial.println("AT+CIPSTATUS");
  delay(2000);
 
  gprsSerial.println("AT+CIPMUX=0");
  delay(2000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CSTT=\"nar\"");//start task and setting the APN
  delay(1000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIICR");//bring up wireless connection
  delay(3000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIFSR");//get local IP adress
  delay(2000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSPRT=0");
  delay(3000);

  ShowSerialData();
    //GSM initial configure end
  gprsSerial.println("AT+CIPSTART=\"TCP\",\"http://64.227.107.166/ \",\"80\"");//connect to server http://64.227.107.166/
  delay(6000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSEND");//begin send data to remote server
  delay(4000);
  ShowSerialData();
  
  String str="$36,5987,56565,545242,567,897,11,23,26*"; //test data
  Serial.println(str);
  gprsSerial.println(str);//begin send data to remote server
  
  delay(4000);
  ShowSerialData();
 
  gprsSerial.println((char)26);//sending
  delay(5000);//waitting for reply, important! the time is base on the condition of internet 
  gprsSerial.println();
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSHUT");//close the connection
  delay(100);
  ShowSerialData();
}
