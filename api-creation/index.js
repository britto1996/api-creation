const express = require('express')
const app = express()
const port = 4000
const https = require('https')

app.get('/', (req, res) => {

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=fbcb4f4a1767b17076d039597e00f18d'
  
  https.get(url,(responce)=>{
    //   console.log(responce)
    //   console.log(responce.statusCode)

      responce.on('data',(d)=>{
        const weatherData = JSON.parse(d)
        console.log(weatherData)
        const temprature = weatherData.main.temp
        console.log(temprature)
        
        const weatherDescription = weatherData.weather[0].description
        res.write(`<h1>Temprature in india is ${temprature} degree celcius</h1>`)
        res.write(`<p>weather condition in india is ${weatherDescription}</p>`)
        const icon = weatherData.weather[0].icon
        const imageUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
        res.write('<img src=' + imageUrl + '>')
        res.send()
        console.log(weatherDescription)
      })
  }).on('error',(e)=>{
      console.log(e)
  })
  

})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})