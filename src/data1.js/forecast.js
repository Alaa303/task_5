const request = require("request");
const forecast = (longtitude, latitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=1f582cffbb854811a16122818232007&q=" +
    longtitude +
    "," +
    latitude;
  request({ url, json: true }, (error, response) => {
    //   console.log(response.body.location.lat);

    if (error) {
      callback("error has been occured", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, response.body.location.name + " ," + response.body.current.condition.text);
    }
  });
};

module.exports = forecast;