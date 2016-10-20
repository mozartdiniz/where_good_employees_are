import Leaflet from 'leaflet';
import GeoHash from 'geohash';
import ElastiSearchGeohash from './elastic_search_geohash';

export default class MapVisualization {

  constructor() {
    this.map = Leaflet.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      maxZoom: 18
    });

    // Base layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.map);

    console.log(this.map._layers);

  }

  prepareToGetData() {

    let bundle = this.map.getBounds();

    return {
      zoomLevel: this.map.getZoom(),
      bound: {
        northEast: {
          lat: bundle._northEast.lat,
          lng: bundle._northEast.lng
        },
        southWest: {
          lat: bundle._southWest.lat,
          lng: bundle._southWest.lng
        }
      }
    }
  }

  addEventListeners() {

    this.map.on('moveend', () => {
      ElastiSearchGeohash.getData(
        this.prepareToGetData(this.map),
        (json) => {
          this.clearTheMap();
          this.transformingData(json);
        }
      );
    });

    this.map.on('zoomend', () => {
      ElastiSearchGeohash.getData(
        this.prepareToGetData(this.map),
        (json) => {
          this.clearTheMap();
          this.transformingData(json);
        }
      );
    });

  }

  clearTheMap() {

    for(let layer in this.map._layers) {
      if (!this.map._layers[layer]._url) {
        this.map.removeLayer(this.map._layers[layer]);
      }
    }
  }

  transformingData(data) {

    if (data) {
      for(var i = 0; i < data.length; i++) {

        let point = (GeoHash.GeoHash.decodeGeoHash(data[i].key));

        var bounds = [[point.latitude[0], point.longitude[0]], [point.latitude[1], point.longitude[1]]];

        // create an orange rectangle
        L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(this.map);

      }
    }
  }

  render() {
    this.addEventListeners();
    this.transformingData();
  }
}