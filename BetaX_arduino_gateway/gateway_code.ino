#include <Arduino.h>
#include <SoftwareSerial.h>
#include <LoRa.h>
SoftwareSerial myGsm(7,8);
float temp;
int sensorData [32] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
String starter = "1,";
String id = "BetaXHackatrone2020,";
String password = "z$38rP?ap6Uc;3~C@>t&w'P7,";
String terminator = "*";
char* LoRaReceivedByte = 0 ;

float waterTemperature = 0;
float airTemperature = 0;
int humidity = 0;
int waterLevel = 0;
int blurringOfWater = 0;
int salinityOfWater = 0;

enum sensorDataOrder
{              
  WaterLevel=0,              
  WaterTemperature,         
  FlowRate,                 
  WaterAcidity,             
  SalinityOfWater ,         
  AirTemperature,           
  Sodium ,                  
  Alkaline ,                
  No3   ,                   
  Sulfate ,                 
  WaterPermeability   ,     
  WaterOxygen          ,    
  Blurring               ,  
  Chlorophyll           ,   
  Fikosin,               
  Ammonia,                  
  SuspendedSolids        ,  
  NitrogenDioxide        ,  
  AmmoniumIon            ,  
  HardnessOfTheWater     ,  
  ChemicalOxygenDemand    , 
  BiochemicalOxygenDemand  ,
  Nitrite,                  
  Nitrate ,                 
};

void printSerialData()
{
 while(myGsm.available()!=0)
 Serial.write(myGsm.read());
};

void sensorsToServer(){
//real data begin
sensorData[WaterLevel] = waterLevel;
sensorData[WaterTemperature] = waterTemperature;
sensorData[SalinityOfWater] = salinityOfWater;
sensorData[AirTemperature] = airTemperature;
sensorData[Blurring] = blurringOfWater;
//real data end

  sensorData[FlowRate] = 4;
  sensorData[WaterAcidity] = 2;
  
  sensorData[Sodium] = 2,5;                     
  sensorData[Alkaline] = 3,2;               
    
  sensorData[No3] = 4,5;                     
  sensorData[Sulfate] = 3,6;               
    
  sensorData[WaterPermeability] = 1,5;       
  sensorData[WaterOxygen] = 1,8;           
  sensorData[Blurring]  = 1,5;            
  sensorData[Chlorophyll]  = 0,5;           
  sensorData[Fikosin]      =0,8;        
  sensorData[Ammonia]      =1;           
  sensorData[SuspendedSolids] =1,6;      
  sensorData[NitrogenDioxide] =1,7;        
  sensorData[AmmoniumIon]     =0,01;         
  sensorData[HardnessOfTheWater] =1;      
  sensorData[ChemicalOxygenDemand]  =2;  
  sensorData[BiochemicalOxygenDemand]  =3;
  sensorData[Nitrite]=0,5;     
  sensorData[Nitrate]=0,4;
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

void serialDebug(){
Serial.print("Su Temperatur: ");
 Serial.print(waterTemperature);
 Serial.print("Hava Temperatur: ");
 Serial.print(airTemperature);
 Serial.print("Humidity: ");
 Serial.print(humidity);
 Serial.print("Derinlik: ");
 Serial.print(waterLevel);
 Serial.print("Bulaniqliq: ");
 Serial.print(blurringOfWater);
 Serial.print("Duzluluq: ");
 Serial.print(salinityOfWater);
 Serial.println();
}
void setup()
{
 myGsm.begin(9600);  
 Serial.begin(9600);  
   if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
 delay(1000);
}
void receiveDataLoRa0() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");

    char *p1, *p2, *p3, *p4, *p5, *p6;
    char lora_buffer[64];
    memset(lora_buffer, 0, sizeof(lora_buffer));
    char* LoRaReceivedByte = lora_buffer;
    char* LoRaReceivedNextByte;
    // read packet
    while (LoRa.available()) {
      *LoRaReceivedByte = (char)LoRa.read();

      //      Serial.println(LoRaReceivedByte);
      LoRaReceivedNextByte = (LoRaReceivedByte + 1);
      if (strchr(LoRaReceivedByte, 'A') != 0) {
        //        waterTemperature = atoi(LoRaReceivedNextByte);
        p1 = LoRaReceivedNextByte;
      }
      if (strchr(LoRaReceivedByte, 'W') != 0) {
        //        humidity = atoi(LoRaReceivedNextByte);
        p2 = LoRaReceivedNextByte;
      }
      if (strchr(LoRaReceivedByte, 'H') != 0) {
        //        waterLevel = atoi(LoRaReceivedNextByte);
        p3 = LoRaReceivedNextByte;
      }
      if (strchr(LoRaReceivedByte, 'L') != 0) {
        //        blurringOfWater = atoi(LoRaReceivedNextByte);
        p4 = LoRaReceivedNextByte;
      }
      if (strchr(LoRaReceivedByte, 'B') != 0) {
        //        salinityOfWater = atoi(LoRaReceivedNextByte);
        p5 = LoRaReceivedNextByte;
      }
       if (strchr(LoRaReceivedByte, 'S') != 0) {
        //        salinityOfWater = atoi(LoRaReceivedNextByte);
        p6 = LoRaReceivedNextByte;
      }
      LoRaReceivedByte++;
    }
    Serial.print("Lora Buffer = ");
    Serial.println(lora_buffer);
    airTemperature = atoi(p1);
    waterTemperature = atoi(p2);
    humidity = atoi(p3);
    waterLevel = atoi(p4);
    blurringOfWater = atoi(p5);
    salinityOfWater = atoi(p6);
    // print RSSI of packet
    Serial.print("' with RSSI ");
    Serial.println(LoRa.packetRssi());
  }
}

void loop()
{
configureGsm();
receiveDataLoRa0();
sensorsToServer();
sendDataGPRS();
//serialDebug();
delay(1000);
}
