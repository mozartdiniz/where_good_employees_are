import 'whatwg-fetch';

module.exports =  {

  getData(data, callback) {

    fetch(this.urlGenerator(data.zoomLevel)).then((response) => {
      return response.json();
    }).then((json) => {
      callback(json);
    }).catch((ex) => {
      console.log('parsing failed', ex);
    })

  },

  urlGenerator(zoomLevel) {
    if (zoomLevel >= 9) {
      return 'candidate_visits_by_hash_zoomed.json';
    }

    return 'candidate_visits_by_hash.json';
  }

};