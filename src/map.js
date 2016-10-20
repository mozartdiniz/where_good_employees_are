import Leaflet from 'leaflet';
import GeoHash from 'geohash';
import ElastiSearchGeohash from './elastic_search_geohash';

export default class MapVisualization {

  constructor() {
    try {
      this.map = Leaflet.map('map', {
        center: [52.3882127, 4.9204737],
        zoom: 7,
        maxZoom: 22
      });

      // Base layer
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(this.map);

      ElastiSearchGeohash.getData(
        this.prepareToGetData(this.map),
        (json) => {
          this.clearTheMap();
          this.transformingData(json);
        }
      )
    } catch (err) {

    }


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

    if (this.map) {
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

        let ret = L.rectangle(bounds, {
          color: this.colorByDocCount(data[i].doc_count),
          weight: 1,
          fillOpacity: 0.7,
        });

        ret.bindPopup(`Candidates: <strong>${data[i].doc_count}</strong><br>
                      You can add more data: <strong>Data</strong>` );

        ret.addTo(this.map);

      }
    }
  }

  colorByDocCount(docCount) {

    let color = '';

    switch (true) {
      case (docCount > 10000000):
        color = '#7f0000';
        break;
      case (docCount > 1000000):
        color = '#b30000';
        break;
      case (docCount > 100000):
        color = '#d7301f';
        break;
      case (docCount > 10000):
        color = '#ef6548';
        break;
      case (docCount > 1000):
        color = '#fc8d59';
        break;
      case (docCount > 100):
        color = '#fdbb84';
        break;
      case (docCount > 10):
        color = '#fdd49e';
        break;
      case (docCount >= 1):
        color = '#fee8c8';
        break;
      default:
        color = '#fff7ec';
    }

    return color;
  }

  render() {
    this.addEventListeners();
    this.transformingData();
  }
}