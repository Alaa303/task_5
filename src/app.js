const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");

const path = require("path");
const x = path.join(__dirname, "../public");
app.use(express.static(x));

const viewDirectory = path.join(__dirname, "../template1/views");
app.set("views", viewDirectory);

const hbs = require("hbs");
const exp = require("constants");
const { error } = require("console");
const partialPath = path.join(__dirname, "../template1/partials");
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    message: "Welcome to Home Page ^_^ ",
  });
});

app.get("/checkWeather", (req, res) => {
  res.render("checkWeather", {
    title: "Weather",
    countryName: "Egypt",
    longtitude: "31.250",
    latitude: "30.050",
    currentWeather: "Sunny",
    temperature: 32,
  });
});
// app.get('/', (req,res) => {
//         res.send()
// })

app.get('/weather2', (req, res) => {
  res.render("weather2", {
    title : "serch for weather"
  })
})

app.get('/weather2/weather', (req,res) => {
  const geocode = require('./data1.js/geocode')
  const forecast = require('./data1.js/forecast')
  if(!req.query.address) {
    return res.send({
      error : 'you must provide an address'
    })
  }
  
  else {
    geocode(req.query.address, (error, geocodeData) => {
      if(error) {
        return res.send({error})
      }
      forecast(geocodeData.lattitude, geocodeData.longtitude, (error, forecastData) => {
        if(error) {
          return res.send({error})
        }
        res.send ({
          forecast : forecastData,
          location : req.query.address,
          longtitude : geocodeData.longtitude,
          latitude : geocodeData.lattitude
        })
      })
    })
  }

})
  

app.listen(port, () => {
  console.log("Done");
});
