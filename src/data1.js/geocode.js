
const request = require("request");

const geocode = (address, callback) => {
const geocodeUrl =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYWxhYS1tMCIsImEiOiJjbGtrYTh2dnowamgwM2ZuNmh5bzdwaWhnIn0.RZTCKYmYYSUjnG11RBg3cg';
request({ url: geocodeUrl, json: true }, (error, response) => {
  if (error) {
    // low level
    callback ("unable to connect geocode service", undefined)
  }
  else if (response.body.message) {
    callback(response.body.message, undefined)
  }
  else if (response.body.features.length == 0) {
    callback("Unable to find location", undefined)
  }  else {
    callback(undefined, {
     longtitude : response.body.features[0].center[0],
     lattitude : response.body.features[0].center[1],
    })
  }
});

}

module.exports = geocode;