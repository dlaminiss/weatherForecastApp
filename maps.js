//This code runs when the maps page loads
//initialise geographic location to focus in
var lon=-3.18;
var lat=51.48;
//using standard latitude, longitude "EPSG:4326"
var proj1 = new OpenLayers.Projection("EPSG:4326");
var proj2   = new OpenLayers.Projection("EPSG:900913");
var point = new OpenLayers.LonLat(lon, lat);
//transform coordinates so they can be used in openlayer maps
var lonlat=point.transform(proj1,proj2);
//place map in the div with id='weathermap'
var map = new OpenLayers.Map("weathermap");
// Create OSM overlay
var mapBase = new OpenLayers.Layer.OSM();
//creating weather images for different items
var Imagelist=[mapBase];
map.addLayers(Imagelist);
// Add Layer switcher
map.addControl(new OpenLayers.Control.LayerSwitcher());
//set center of map
map.setCenter( lonlat, 7);
//End of initial map display

//hamburger menu function
function responsiveMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav_container") {
        x.className += " responsive";
    } else {
        x.className = "nav_container";
    }
}

//this functions allows user to view a weather image layer
function weathermaps(){
  //adding image layers to view
  var clouds_images = new OpenLayers.Layer.XYZ(
       "clouds",
       "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
       {
           isBaseLayer: false,
           opacity: 0.7,
           sphericalMercator: true
       }
   );
   //get precipitation image layer
   var precipitation_images = new OpenLayers.Layer.XYZ(
    "precipitation",
    "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
    {
        isBaseLayer: false,
        opacity: 0.7,
        sphericalMercator: true
    }
  );
  //gets temperature image layer
  var temp_images = new OpenLayers.Layer.XYZ(
       "temperature",
       "http://${s}.tile.openweathermap.org/map/temp/${z}/${x}/${y}.png",
       {
           isBaseLayer: false,
           opacity: 0.7,
           sphericalMercator: true
       }
   );
   //gets rain image layer
   var rain_images = new OpenLayers.Layer.XYZ(
        "rain",
        "http://${s}.tile.openweathermap.org/map/rain/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );
  //this logic ensure that only one image layer can be viewed at a time
  if (Imagelist.length>1){
    map.removeLayer(Imagelist[1]);
  }
  //get user's image request
  document.getElementById('data_type3').addEventListener("change",getImage());
  if (selectedImageIndex===1){
    Imagelist=[mapBase,clouds_images];
  } else if (selectedImageIndex===2){
    Imagelist=[mapBase,precipitation_images];
  } else if (selectedImageIndex===3){
    Imagelist=[mapBase,rain_images];
  } else if (selectedImageIndex===4) {
    Imagelist=[mapBase,temp_images];
  }
  var rain_images; var temp_images;
  map.addLayers(Imagelist);
  //map.setCenter( lonlat, 7);
};

//this global variable holds the user's choice of image in the maps dropdown selection
var selectedImageIndex;

//this function records the selectedIndex in data_type3 dropdown
function getImage(){
  selectedImageIndex=document.getElementById("data_type3").selectedIndex;
}

//this function changes the geographic focus on the map
function changeFocus(){
  lon=document.getElementById("maplon").value;
  lat=document.getElementById("maplat").value;
  proj1 = new OpenLayers.Projection("EPSG:4326");
  proj2   = new OpenLayers.Projection("EPSG:900913");
  point = new OpenLayers.LonLat(lon, lat);
  lonlat=point.transform(proj1,proj2);
  map.setCenter( lonlat, 7);
}
