// Creating map object
var myMap = L.map("map", {
  center: [60, 80],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 15,
  id: "mapbox.light",
  accessToken: 'pk.eyJ1IjoicXFuZXNzIiwiYSI6ImNqcDVtNXNtczAxejIzcG13eTdlZzN4b28ifQ.YQjvIazRluFetWkX9uoOpA'
}).addTo(myMap);

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 15,
  id: "mapbox.dark",
  accessToken: 'pk.eyJ1IjoicXFuZXNzIiwiYSI6ImNqcDVtNXNtczAxejIzcG13eTdlZzN4b28ifQ.YQjvIazRluFetWkX9uoOpA'
}).addTo(myMap);


// URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Grab data with d3
d3.json(url, function(data) {
  
  var feats= data.features;

  console.log(feats);
  // Loop through data
  feats.forEach(function (a){
    var loc = a.geometry;
    var magni = a.properties.mag;

    if (location) {
      // Add a new marker to the cluster group and bind a pop-up
        var circle = L.circle([loc.coordinates[1], loc.coordinates[0]], {
          color: 'red',
          fillOpacity: 0.8,
          radius: magni*5000
      }).addTo(myMap);
      circle.bindPopup(a.properties.title);
    };
    console.log(loc,magni);
  });
});