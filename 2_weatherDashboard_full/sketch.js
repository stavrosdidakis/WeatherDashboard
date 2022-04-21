//OpenWeatherMap API
let apiKey = "XXXXX"; //REPLACE XXXXX with your API key (from OpenWeatherMap)

//The values of the variables here are to ensure a preset content appears on
//the screen upon initialization
let getCity = "Shanghai";
let getDesc = "Clear";
let getTemp = 0;
let getHumid = 0;
let getWindSpeed = 0;

//Variables for custom fonts
let fontLight, fontLItalic,fontRegular,fontBold;

//Arrays for icons, weather instances, and background images
let img = [];
let weatherObjs = [];
let bgImg = [];

//Variables for the selector interface
let citySelector1, citySelector2, citySelector3;
let selectorValue;

//In preload() we load the fonts and images we will be using later
function preload(){
  fontLight = loadFont("assets/OpenSans-Light.ttf");
  fontLItalic =loadFont("assets/OpenSans-LightItalic.ttf");
  fontRegular =loadFont("assets/OpenSans-Regular.ttf");
  fontBold =loadFont("assets/OpenSans-Bold.ttf");

  //Load the icon images
  for (let i=0; i<6; i++){
    img[i] = loadImage("icons/icon" +(i+1)+ ".svg");
  }

  //Background images
  bgImg[0] = loadImage("images/shanghai.png");
  bgImg[1] = loadImage("images/athens.png");
  bgImg[2] = loadImage("images/newYork.png");
  bgImg[3] = loadImage("images/london.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  //Approx. size 796,1210

  //Run the three class instances with preset values
  initializeWeatherObjs();

  //Resize the background images for the current canvas size
  for (let i=0; i<bgImg.length; i++){
    bgImg[i].resize(windowWidth/3, windowHeight);
  }

  //Selector interface
  setupSelectors(); //Function in setupSelectors.js file
}

function initializeWeatherObjs(){
  //Initialize the three instances (values prefix from global variables)
  //Here we pass to the constructor position in x and y, size of the screen area the instance uses, the selected city,
  //and weather data: temperature, weather description, humidity, wind speed
  weatherObjs[0] = new WeatherClass (0*(width/3), 0, width/3, getCity, getDesc, getTemp, getHumid, getWindSpeed, bgImg[0]);
  weatherObjs[1] = new WeatherClass (1*(width/3), 0, width/3, getCity, getDesc, getTemp, getHumid, getWindSpeed, bgImg[0]);
  weatherObjs[2] = new WeatherClass (2*(width/3), 0, width/3, getCity, getDesc, getTemp, getHumid, getWindSpeed, bgImg[0]);
}

//Callback function when selector 1 has been used
//A new API call is triggered, which returns data on the weatherCallback function
function citySelEvent1(){
  selectorValue = 1;
  let loc = citySelector1.value();
  let url = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units=metric&appid="+apiKey;
  loadJSON(url, weatherCallback);
}

//Callback function when selector 2 has been used
//A new API call is triggered, which returns data on the weatherCallback function
function citySelEvent2(){
  selectorValue = 2;
  let loc = citySelector2.value();
  if(loc!=="Select city"){
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units=metric&appid="+apiKey;
    loadJSON(url, weatherCallback);
  }
}

//Callback function when selector 3 has been used
//A new API call is triggered, which returns data on the weatherCallback function
function citySelEvent3(){
  selectorValue = 3;
  let loc = citySelector3.value();
  let url = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units=metric&appid="+apiKey;
  loadJSON(url, weatherCallback);
}

//In the weatherCallback, data from the API are extracted and used to create
//the corresponding instances
function weatherCallback(weatherData){
  console.log(weatherData);
  getCity = weatherData.name;
  getDesc = weatherData.weather[0].main;
  getTemp = weatherData.main.temp;
  getHumid = weatherData.main.humidity;
  getWindSpeed = weatherData.wind.speed;

  //The selectorValue ensures that when a specific selector is used, a new class instance is generated with the new content
  if (selectorValue==1) weatherObjs[0] = new WeatherClass (0*(width/3), 0, width/3, getCity, getDesc, getTemp, getHumid, getWindSpeed);
  if (selectorValue==2) weatherObjs[1] = new WeatherClass (1*(width/3), 0, width/3, getCity, getDesc, getTemp, getHumid, getWindSpeed);
  if (selectorValue==3) weatherObjs[2] = new WeatherClass (2*(width/3), 0, width/3, getCity, getDesc, getTemp, getHumid, getWindSpeed);
}

function draw() {
  //Run the instances
  for (let i=0; i<weatherObjs.length; i++){
    weatherObjs[i].setFeatures();
    weatherObjs[i].setGradient();
    //weatherObjs[i].setBG();
    weatherObjs[i].setWaves();
    weatherObjs[i].update();
  }
}

class WeatherClass {
  constructor(x, y, size, location, description, temp, humid, windSpeed, imgBG){
    this.x = x;
    this.y = y;
    this.size = size;

    //Content from API
    this.location = location;
    this.description = description;
    this.col1 = color(random(40,50));
    this.col2 = color(random(120,130));
    this.temp = temp;
    this.humid = humid;
    this.windSpeed = windSpeed;

    //Icons and images
    this.icon;
    this.bgImg = imgBG;

    //Waves variables
    this.counter = 0;
    this.numOfLines = random (70, 100);
    this.wavesSpeed = random (0.001, 0.01);
  }

  //For each specific weather description, create different color values and icons
  setFeatures(){
    if(this.description==="Atmosphere"){
      this.col1 = color("#002463");
      this.col2 = color("#2D85A8");
      this.icon = img[5];
    }
    if(this.description==="Clear"){
      this.col1 = color("#4AA2D9");
      this.col2 = color("#035AA6");
      this.icon = img[3];
    }
    if(this.description==="Clouds"){
      this.col1 = color("#9FB0BF");
      this.col2 = color("#4F6F8C");
      this.icon = img[0];
    }
    if(this.description==="Mist"){
      this.col1 = color("#363740");
      this.col2 = color("#7D7F8C");
      this.icon = img[0];
    }
    if(this.description==="Rain"){
      this.col1 = color("#7787A6");
      this.col2 = color("#4C5D73");
      this.icon = img[1];
    }
    if(this.description==="Haze"){
      this.col1 = color("#455953");
      this.col2 = color("#1A1E26");
      this.icon = img[5]; console.log(10);
    }
    if(this.description==="Drizzle"){
      this.col1 = color("#106973");
      this.col2 = color("#011826");
      this.icon = img[1];
    }
    if(this.description==="Thunderstorm"){
      this.col1 = color("#333740");
      this.col2 = color("#5D6473");
      this.icon = img[4];
    }
    if(this.description==="Snow"){
      this.col1 = color("#A7C6D9");
      this.col2 = color("#465E73");
      this.icon = img[2];
    }
    if(this.description==="Extreme"){
      this.col1 = color("#655A8C");
      this.col2 = color("#151226");
      this.icon = img[5];
    }
    if(this.description==="Additional"){
      this.col1 = color("#D1AF6B");
      this.col2 = color("#52452A");
      this.icon = img[5];
    }
  }

  // Gradient Color
  setGradient(){
    noFill();
    //Use to colors to create a gradient (using interpolation)
    for (let i=0; i<=windowHeight; i++) {
      let inter = map(i, 0, windowHeight, 0, 1);
      let c = lerpColor(this.col1, this.col2, inter);
      stroke(c);
      line(this.x, i, this.x+(windowWidth/3), i);
    }
  }

  //Different image of a city appears according to the corresponding location
  //(this example demonstrates only 4 specific cities)
  setBG(){
    if (this.location==="Shanghai") this.bgImg = bgImg[0];
    if (this.location==="Athens") this.bgImg = bgImg[1];
    if (this.location==="New York") this.bgImg = bgImg[2];
    if (this.location==="London") this.bgImg = bgImg[3];
    tint(255,40);
    image(this.bgImg, this.x, 0);
    tint(255,255)
  }

  //A generative wave visual for enhancing th visual content of the panels
  setWaves(){
    this.counter+=1;
    push();
    translate(this.x, 0);
    for (let i=0; i<this.numOfLines; i++) {
      //let col = map(i, 1, i, 10, 255);

      //Color of the lines depends on the weather conditions extracted from the API
      if(this.description==="Atmosphere") stroke(141, 199, 193, 80);
      if(this.description==="Clear") stroke(190, 169, 222, 120);
      if(this.description==="Clouds") stroke(191, 209, 217,120)
      if(this.description==="Mist") stroke(217, 209, 186, 60);
      if(this.description==="Rain") stroke(168, 176, 191, 120);
      if(this.description==="Haze") stroke(191, 182, 164, 60);
      if(this.description==="Drizzle") stroke(14, 86, 115, 120);
      if(this.description==="Thunderstorm") stroke(117, 170, 191, 80);
      if(this.description==="Snow") stroke(220, 222, 222, 60);
      if(this.description==="Extreme") stroke(178, 167, 217, 60);
      if(this.description==="Additional") stroke(222, 186, 113, 60);

      //Make the shape
      beginShape();
      for (let x=0; x<=windowWidth/3+30; x+=20) {
        let n = noise(x * 0.001, i * 0.01, this.counter * this.wavesSpeed);
        let y = map(n, 0, 1, 0, height);
        vertex(x, y);
      }
      endShape();
    }
    pop();
  }

  update(){
    //Text updates for the city
    textFont(fontBold);
    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(100*(windowWidth/2400));
    text(this.location,this.x+80,windowHeight/6.,windowWidth/3.5,windowHeight/2);

    //Text updates for the weather description
    textFont(fontLight);
    textSize(50*(windowWidth/2400));
    text(this.description, this.x+(windowWidth/8), windowHeight/2.6, windowWidth/2.3, windowHeight/3);
    image(this.icon, this.x+(windowWidth/30), windowHeight/3.7, windowWidth/11, windowWidth/11);

    //Text updates for the temperature
    textAlign(RIGHT);
    textFont(fontLight);
    textSize(250*(windowWidth/2400));
    text(parseInt(this.temp)+"°c", this.x-(windowWidth/5.9), windowHeight/2.15, windowWidth/2, windowHeight/2);

    //Text updates for the humidity
    textAlign(LEFT);
    textFont(fontLight);
    textSize(20*(windowWidth/2400));
    text("HUMIDITY", this.x+(windowWidth/17),windowHeight/1.27,windowWidth/6.5,windowHeight/4);
    textSize(60*(windowWidth/2400));
    text(this.humid, this.x+(windowWidth/28),windowHeight/1.38,windowWidth/2.7,windowHeight/3);

    //Text updates for the wind speed
    textSize(20*(windowWidth/2400));
    text("WIND SPEED ", this.x+(windowWidth/4.), windowHeight/1.27,windowWidth/6.5,windowHeight/4);
    textSize(60*(windowWidth/2400));
    text(this.windSpeed,this.x+(windowWidth/4.5),windowHeight/1.38,windowWidth/2.7,windowHeight/3);
  }
}

//Function called when the window is resized
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  //Remove the selectors and re-initialize them
  citySelector1.remove();
  citySelector2.remove();
  citySelector3.remove();
  setupSelectors();

  //Initialize the class instances
  initializeWeatherObjs();

  //Re-initialize the size of the background images
  for (let i=0; i<bgImg.length; i++){
    bgImg[i].resize(windowWidth/3, windowHeight);
  }
}
