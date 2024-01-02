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

var k=1; //initializing forecast day selection controler

//This function updates the k variable depending of selected selection in data_type div
function getDay(){
  k=document.getElementById("data_type1").selectedIndex;
}

/*This function proccess the weather forecast data and creates the weather
forecast table*/
var weatherForecast = function(){
  var weather_data=JSON.parse(this.response);
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

function myFunction(){
  var xhttp = new XMLHttpRequest();
  var urlCity1 = document.getElementById('city').value;
  /*to make sure we can search different days when page loads initially
  with cardiff data*/
  if (urlCity1.length===0){
    urlCity1='cardiff';
  };
  var apikey=""; //enter API key
  var base_url='http://api.openweathermap.org/data/2.5/forecast';
  var real_url = base_url+'?'+'q='+urlCity1+'&appid='+apikey+'&units=metric';
  xhttp.addEventListener('load',weatherForecast);
  console.log('RUNNING '+real_url);
  xhttp.open('Get',real_url);
  xhttp.send();
};


//This code displays the default weather forecast: Cardiff
var xhttp = new XMLHttpRequest();
var apikey=""; //enter API key
var base_url='http://api.openweathermap.org/data/2.5/forecast';
var real_url = base_url+'?'+'lat='+latitude+'&lon='+longitude+'&appid='+apikey+'&units=metric';
console.log(real_url);
xhttp.addEventListener('load',weatherForecast);
xhttp.open('Get',real_url);
xhttp.send();
