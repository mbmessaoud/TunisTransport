


var map;

var stations = {};


var xmlhttp = new XMLHttpRequest();

const BusIcon = L.icon({
    iconUrl: 'icons8-trolleybus-16.png',
});

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       stations =JSON.parse(this.responseText);
       console.log(stations);
      
      map = new L.Map('mapid').fitBounds(stations.bounds);

      // create the tile layer with correct attribution
      var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
      var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

      
      var index = stations.stations.length;

      while ( index --)
      {
         let station =  stations.stations[index];
          L.marker([station.lat, station.long],
                     {title: station.name,  icon: BusIcon}).addTo(map);
      }
 
      map.addLayer(osm);
      //L.layerGroup(stationList).addTo(map);
      
  }
};
xmlhttp.open("GET", "data/stations.json", true);
xmlhttp.send();
