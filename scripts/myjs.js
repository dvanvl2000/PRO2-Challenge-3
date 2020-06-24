// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZHZhbnZsMjAwMCIsImEiOiJja2I3dGRnejkwOTRoMnN1c3pmZnp4NDYxIn0.uFnL4V3o6EK4tEHmVUMuxw';

// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '973e4fc4d5e54fe25bb627add35ea560';

// Determine cities
var city = [
  {
    name: 'Cape Canaveral',
    coordinates: [-80.605659, 28.396837]
  },
    {
    name: 'Cuba',
    coordinates: [-82.366592, 23.113592]
  },
  {
    name: 'Bahamas',
    coordinates: [-78.035889, 25.025885]
  },
  {
    name: 'Yucatan',
    coordinates: [-89.134857, 20.400417]
  },
  {
    name: 'Georgia',
    coordinates: [-83.441162, 33.247875]
  },
  {
    name: 'Alabama',
    coordinates: [-86.902298, 32.318230]
  },
];


// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dvanvl2000/ckbsliof6012a1iqj44t3fkke',
  center: [-80.605659, 27.596837],
  zoom: 4.6

});

  myPopup = new mapboxgl
            .Popup()
            .setHTML("Cape Canaveral");

  myPopup2 = new mapboxgl
            .Popup()
            .setHTML("Cuba, Distance to Cape Canaveral: 724,90 km");

  myPopup3 = new mapboxgl
            .Popup()
            .setHTML("Bahamas, Distance to Cape Canaveral: 491,97 km");

  myPopup4 = new mapboxgl
            .Popup()
            .setHTML("Yucatan, Distance to Cape Canaveral: 2.182,96 km");

  myPopup5 = new mapboxgl
            .Popup()
            .setHTML("Georgia, Distance to Cape Canaveral: 1.145,12 km");

  myPopup6 = new mapboxgl
            .Popup()
            .setHTML("Alabama, Distance to Cape Canaveral: 1.470,22 km");


// get weather data and plot on map
map.on('load', function () {
  city.forEach(function(city) {

    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];
    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });

      // Adding a marker based on lon lat coordinates
      var marker = new mapboxgl
        .Marker()
        .setLngLat([-80.605659, 28.396837])
        .setPopup(myPopup)
        .addTo(map);

      var marker = new mapboxgl
        .Marker()
        .setLngLat([-82.366592, 23.113592])
        .setPopup(myPopup2)
        .addTo(map);

      var marker = new mapboxgl
        .Marker()
        .setLngLat([-78.035889, 25.025885])
        .setPopup(myPopup3)
        .addTo(map);       

      var marker = new mapboxgl
        .Marker()
        .setLngLat([-89.134857, 20.400417])
        .setPopup(myPopup4)
        .addTo(map);     

      var marker = new mapboxgl
        .Marker()
        .setLngLat([-83.441162, 33.247875])
        .setPopup(myPopup5)
        .addTo(map);    

      var marker = new mapboxgl
        .Marker()
        .setLngLat([-86.902298, 32.318230])
        .setPopup(myPopup6)
        .addTo(map);                     


  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates,
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 2
        }
      });
    }
  );
}