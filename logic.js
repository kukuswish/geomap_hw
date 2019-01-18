// An array of cities and their locations
var cities = [
  {
    name: "Paris",
    location: [48.8566, 2.3522]
  },
  {
    name: "Lyon",
    location: [45.7640, 4.8357]
  },
  {
    name: "Cannes",
    location: [43.5528, 7.0174]
  },
  {
    name: "Nantes",
    location: [47.2184, -1.5536]
  }
];

// An array which will be used to store created cityMarkers
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
var cityMarkers = [];
d3.json(url, function(data) {
  
  var feats= data.features;
  console.log(data);
  // Loop through data
  feats.forEach(function (a){
    var loc = a.geometry;
    var magni = a.properties.mag;

    if (location) {
      // Add a new marker to the cluster group and bind a pop-up
      var color = '#000';
      var opacity = 1;

      if(magni > 5){
        color = "#ff0000";
        opacity = .9;
      }else if(magni > 4){
        color ="#ff4000";
        opacity = .7;
      }
      else if(magni > 3){
        color ="#ff8000";
        opacity = .6;
      }
      else if(magni > 2){
        color ="#ffbf00";
        opacity =.5;
      }else{
        color ="#ffff00";
        opacity = .5;
      }
        cityMarkers.push(
          L.circle([loc.coordinates[1], loc.coordinates[0]], {
              color: color,
              fillOpacity: opacity,
              radius: magni*15000
          }).bindPopup(a.properties.title)
        );
    };
  });
  // Add all the cityMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
  var eqLayer = L.layerGroup(cityMarkers);

  // Define variables for our tile layers
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: 'pk.eyJ1IjoicXFuZXNzIiwiYSI6ImNqcDVtNXNtczAxejIzcG13eTdlZzN4b28ifQ.YQjvIazRluFetWkX9uoOpA'
  });

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: 'pk.eyJ1IjoicXFuZXNzIiwiYSI6ImNqcDVtNXNtczAxejIzcG13eTdlZzN4b28ifQ.YQjvIazRluFetWkX9uoOpA'
  });

  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    Earthquakes: eqLayer
  };

  // Create map object and set default layers
  var myMap = L.map("map", {
    center: [30, 40],
    zoom: 2,
    layers: [light, eqLayer]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);
});


