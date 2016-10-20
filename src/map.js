import Leaflet from 'leaflet';
import GeoHash from 'geohash';

export default class MapVisualization {

  render() {

    const map = Leaflet.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      maxZoom: 18
    });

    const markers = L.markerClusterGroup();

    for (var i = 0; i < addressPoints.length; i++) {

      var a = addressPoints[i];
      var title = a[2];
      var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
      marker.bindPopup(title);
      markers.addLayer(marker);

    }

    map.addLayer(markers);

    // Base layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map);
  }
}