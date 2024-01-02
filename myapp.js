var cityname //holds name of city from current weather json file
//initialise geo coordinates
var longitude=-3.18;
var latitude=51.48;
//hamburger menu function
function responsiveMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav_container") {
        x.className += " responsive";
    } else {
        x.className = "nav_container";
    }
}

//this function proccess and displays the current weather data
var weatherData = function(){
  var weather_data=JSON.parse(this.response);
  document.getElementById("current_timezone").style.display = "inherit";//ensure current_timezone is displayed
  document.getElementById("weather_forecast").style.display = "none";//make sure the weather_forecast div not displayed
  var humidity=weather_data.main.humidity;//get humidity
  var temper=weather_data.main.temp;//get temperature
  var maxtemp=weather_data.main.temp_max;//get maximum temperature
  var mintemp=weather_data.main.temp_min;//get minimum temperature
  var pressure=weather_data.main.pressure;//get pressure
  var windspeed=weather_data.wind.speed;//get wind speed
  longitude=weather_data.coord.lon;//get longitude
  latitude=weather_data.coord.lat;//get latitude
  var weather_icon=weather_data.weather[0].icon;//get weather icon
  var clouds=weather_data.clouds.all;
  cityname=weather_data.name;
  var countryname=weather_data.sys.country;
  var line1='Current Weather in'+'<br>'+countryname+','+cityname;
  //populating the current weather table with data
  document.getElementById("current_weather_table").rows[1].cells[1].innerHTML=temper+'&deg;C';
  document.getElementById("current_weather_table").rows[2].cells[1].innerHTML=maxtemp+'&deg;C';
  document.getElementById("current_weather_table").rows[3].cells[1].innerHTML=mintemp+'&deg;C';
  document.getElementById("current_weather_table").rows[4].cells[1].innerHTML=clouds+'%';
  document.getElementById("current_weather_table").rows[5].cells[1].innerHTML=humidity+'%';
  document.getElementById("current_weather_table").rows[6].cells[1].innerHTML=pressure+'wph';
  document.getElementById("current_weather_table").rows[7].cells[1].innerHTML=windspeed+'m/s';
  var weathericon_link='http://openweathermap.org/img/w/'+weather_icon+'.png'
  document.getElementById("weathericon").src = weathericon_link;//weather icon in home page
  document.getElementById('curr_header').innerHTML=line1;
  document.getElementById('temp1').innerHTML=temper+'&deg;C'+'<br>'
  +weather_data.weather[0].description;
  requestTime();
  requestSunset();
};//end of weatherData function

var k=1; //initializing forecast day selection controler

//This function updates the k variable depending of selected selection in data_type div
function getDay(){
  k=document.getElementById("data_type1").selectedIndex;
}

/*This function proccess the weather forecast data and creates the weather
forecast table*/
var weatherForecast = function(){
  var weather_data=JSON.parse(this.response);
  document.getElementById("current_timezone").style.display = "none";//disable display current weather div
  document.getElementById("weather_forecast").style.display = "inherit";//enable display of weather_forecast div
  document.getElementById('data_type1').addEventListener("change",getDay);
  var date1=weather_data.list[0].dt_txt;//first date for weather forecast
  console.log('Today date is '+date1);
  var a=parseInt(date1.slice(11, 13));//get and change to integer type
  var st_ind;//start index, to be used for indexing weather forecast data
  var b;//number of time intervals (hourly)
  var d1=(24-parseInt(a))/3;//number of cols for day1
  //if day required is day1(k==1)
  if (k==1){
    st_ind=-1;
    b=d1-1;
  } else{
    st_ind=(d1+8*(k-2))-1;
    b=st_ind+8;
  };
  var cityname=weather_data.city.name;
  //text to be displayed on top of the weather_forecast table
  var headertxt='Hourly Weather forecast in ';
  if (k==1){
    document.getElementById('forecast_header').innerHTML=headertxt+
    cityname+' on '+(weather_data.list[0].dt_txt).slice(0,10);
  } else {
    document.getElementById('forecast_header').innerHTML=headertxt+
    cityname+' on '+(weather_data.list[st_ind+1].dt_txt).slice(0,10);
  }
  /*Create table in forecast_table div and populate it with data from the
  forecast JSON file*/
  var forecastdata = document.getElementById('forecast_table');
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var cellText;
  var tyme=0;//initialise time display on forecast table
  var c=0;
  //This loop creates and populate populate the table
  for (var i = 0; i < 9; i++) {
  // creates a table row
    var row = document.createElement("tr");
    for (var j = st_ind; j < b+1; j++) {
      var cell = document.createElement("td");
        if (i===0 && j===st_ind){
          //time intervals display in firstrow using arithmetic progression formula
            cellText = document.createTextNode('Time(3hr space)');
        } else if (i===0 && j !==st_ind) {
          if (k==1){
            cellText = document.createTextNode((a+(tyme-1)*3)+'-'+((a+(tyme-1)*3)+3)+'hrs');
          } else {
            cellText = document.createTextNode((c+(tyme-1)*3)+'-'+((c+(tyme-1)*3)+3)+'hrs');
          }
        } else if (i===1 && j===st_ind) {
            cellText = document.createTextNode('Icons');
        } else if (i===2 && j===st_ind) {
            cellText = document.createTextNode('Desc.');
        } else if (i===3 && j===st_ind) {
            cellText = document.createTextNode('Temp');
        } else if (i===4 && j===st_ind) {
            cellText = document.createTextNode('Min Temp');
        } else if (i===5 && j===st_ind) {
            cellText = document.createTextNode('Max Temp');
        } else if (i===6 && j===st_ind) {
            cellText = document.createTextNode('Humidity');
        } else if (i===7 && j===st_ind) {
            cellText = document.createTextNode('Cloud Cov.');
        } else if (i===8 && j===st_ind) {
            cellText = document.createTextNode('Pressure');
        } else if (i===1 && j !==st_ind) {
          var weather_icon =weather_data.list[j].weather[0].icon+'.png';//weather icon
          var weathericon_link='http://openweathermap.org/img/w/'+weather_icon;
          //Create image node and link weather icon
          var x = document.createElement("IMG");
          x.setAttribute("src", weathericon_link);
          x.setAttribute("alt", weather_icon);
        } else if (i===2 && j !==st_ind) {
            cellText = document.createTextNode(weather_data.list[j].weather[0].description);//weatherdescription
        } else if (i===3 && j!==st_ind) {
            cellText = document.createTextNode(weather_data.list[j].main.temp+'°C');//temperature
        } else if (i===4 && j!==st_ind) {
            cellText = document.createTextNode(weather_data.list[j].main.temp_min+'°C');//minimum temperature
        } else if (i===5 && j!==st_ind) {
            cellText = document.createTextNode(weather_data.list[j].main.temp_max+'°C');//maximum temperature
        } else if (i===6 && j!==st_ind) {
            cellText = document.createTextNode(weather_data.list[j].main.humidity+'%');//humidity
        } else if (i===7 && j!==st_ind) {
            cellText = document.createTextNode(weather_data.list[j].clouds.all+'%');//cloud cover
        } else {
            cellText = document.createTextNode(weather_data.list[j].main.pressure+'hpa');//pressure
        }
        if (i===1 && j !==st_ind){
          cell.appendChild(x); //appening image link of weather icon(node(x))
        } else{
          cell.appendChild(cellText);
        }
          row.appendChild(cell);
        tyme=tyme+1;//increment time display
      };
    // add the row to the end of the table body
    tblBody.appendChild(row);
    };
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  //reomve previous table before appending a new table
  if (forecastdata.hasChildNodes()) {
    forecastdata.removeChild(forecastdata.childNodes[0]);
    forecastdata.appendChild(tbl);
  } else {
    forecastdata.appendChild(tbl);
  }
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
};

/*This function handles the timezonedb XMLHttpRequest and pass the timeZones
function on load*/
var requestTime = function(){
  var key1='0PWBKRM4I3KP';
  var base_url1='http://api.timezonedb.com/v2/get-time-zone';
  var real_url1 = base_url1+'?'+'key='+key1+'&'+'format=json&by=position&lat='+latitude+'&lng='+longitude;
  console.log('Inst1 '+latitude);
  console.log(real_url1);
  var xhttp1 = new XMLHttpRequest();
  xhttp1.addEventListener('load',timeZones,true);
  xhttp1.open('Get',real_url1);
  xhttp1.send();
}

/*This function handles the sunset-sunrise XMLHttpRequest and passes the sunSet
function on load*/
var requestSunset = function(){
  var xhttp2 = new XMLHttpRequest();
  var base_url2='http://api.sunrise-sunset.org/json';
  var real_url2 = base_url2+'?'+'lat='+latitude+'&lng='+longitude;
  console.log(real_url2);
  xhttp2.addEventListener('load',sunSet);
  xhttp2.open('Get',real_url2);
  xhttp2.send();
}

/*This function return either forecast or current depending of the user's selection
in the dropdown menu in the header*/
var find_data = function(){
  var selectedanswer=document.getElementById("data_type").selectedIndex;
   if (document.getElementsByTagName("option")[selectedanswer].value=="current"){
     return 'weather';
   } else if (document.getElementsByTagName("option")[selectedanswer].value=="forecast"){
     return 'forecast';
  } else {
    return null;
  }
};

//This the function which reuns when you click the submit button in the header
function myFunction(){
  var xhttp = new XMLHttpRequest();
  var cityname = document.getElementById('city').value;
  var apikey=""; //enter API key
  var base_url='http://api.openweathermap.org/data/2.5/';
  var datatype=find_data();
  //determining which function to run, weather forecast current weather
  var real_url = base_url+datatype+'?'+'q='+cityname+'&appid='+apikey+'&units=metric';
  console.log(real_url);
  if (datatype==='weather'){
    xhttp.addEventListener('load',weatherData);
  } else if(datatype==='forecast'){
    xhttp.addEventListener('load',weatherForecast);
  }
  xhttp.open('Get',real_url);
  xhttp.send();
};


var GMT; //holds the  GMT offset in hours, updated by timeZones function
var Areahrs;//holds hour time, updated by timeZones and used by displayTime
//var country_name;//holds name of country, from timezonedb json file
var country_name;
var timeZones = function(){
  var time_data=JSON.parse(this.response);
  country_name=time_data.countryName;
  var time_now=time_data.formatted;
  var gmtoffset=time_data.gmtOffset;
  Areahrs=parseInt(time_now.slice(11, 13));
  var b=parseInt(gmtoffset);//converting gmtOffset into an interger
  GMT=(b/3600);//converting gmtOffset to hours
  displayClock();
};

var displayClock = function(){
  var today = new Date();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  var hrs=Areahrs;
  hrs=checkhrs(hrs)
  if (min==59 && sec==59){
    Areahrs=Areahrs+1;
  }
  min=checkTime(min);
  sec=checkTime(sec);
  hrs=checkTime(hrs);
  var clockheader='Current time in <br>'+cityname+'/'+country_name+'<br>'+hrs + ":" + min + ":" + sec+' GMT '+GMT+'hrs';
  document.getElementById('clock').innerHTML =clockheader;
  var clock = setTimeout(displayClock, 1000);
};

// add zero in front of numbers < 10
function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  };
  return i;
  }
 //make sure hours are within 24hour clock
  function checkhrs(x){
  if (x>=24){ x=x-24}
  return x;
}

var sunSet = function(){
  var sunset_data=JSON.parse(this.response);
  var sunset=sunset_data.results.sunset;
  var sunrise=sunset_data.results.sunrise;
  var day_len=sunset_data.results.day_length;
  var civil_tw_bgn=sunset_data.results.civil_twilight_begin;
  var civil_tw_end=sunset_data.results.nautical_twilight_end;
  document.getElementById("timezoneTable").rows[0].cells[2].innerHTML=sunrise;
  document.getElementById("timezoneTable").rows[1].cells[2].innerHTML=sunset;
  document.getElementById("timezoneTable").rows[2].cells[2].innerHTML=day_len;
  document.getElementById("timezoneTable").rows[3].cells[2].innerHTML=civil_tw_bgn;
  document.getElementById("timezoneTable").rows[4].cells[2].innerHTML=civil_tw_end;
};



//This code displays the default weather: Cardiff
var xhttp = new XMLHttpRequest();
var apikey=""; //enter API key
var base_url='http://api.openweathermap.org/data/2.5/weather';
var real_url = base_url+'?'+'lat='+latitude+'&lon='+longitude+'&appid='+apikey+'&units=metric';
console.log(real_url);
xhttp.addEventListener('load',weatherData);
xhttp.open('Get',real_url);
xhttp.send();
