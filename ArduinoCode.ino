#include <LiquidCrystal.h>;
#define trigPin 8
#define echoPin 9
#define startPin 7
int lastDistance;
int score = 0;
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(startPin, INPUT);
  digitalWrite(trigPin, LOW);
  lcd.begin(16, 2);
  lcd.write("Welcome to Pong");
  lcd.setCursor(0,1);
  lcd.write("by Ben & Marek");
  delay(2000);
  lcd.clear();
  lcd.write("press start");
  waitForStart();
}

void loop() {
  long duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
  if (distance < lastDistance) {
    Serial.write(2);
  }
  if (distance > lastDistance) {
    Serial.write(1);
  } else {
  }
  lastDistance = distance;
  if (Serial.available() > 0) {
    score = Serial.read();
    lcd.clear();
    lcd.print("Score:" + score);
    waitForStart();
  }
  delay(50);
}

void gamestart() {
  lcd.write("3");
  delay(1000);
  lcd.write(" 2");
  delay(1000);
  lcd.write(" 1");
  delay(1000);
  lcd.clear();
  lcd.write("play!!!");
  Serial.write(3);
}

void waitForStart() {
  while (digitalRead(startPin) != HIGH) { }
  lcd.clear();
  gamestart();
}
