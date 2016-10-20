import 'whatwg-fetch';

module.exports =  {

  getData(data, callback) {

    fetch('candidate_visits_by_hash.json').then((response) => {
      return response.json()
    }).then((json) => {
      callback(json);
    }).catch((ex) => {
      console.log('parsing failed', ex);
    })

  }

};