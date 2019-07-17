/* eslint-disable */
const request = require('request')

const forecast = (latitude, longitude, cllback) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1023eda4d96d67a931f77985468b3f63/' + encodeURIComponent(latitude + ", " + longitude)
    request( {url, json : true}, (error, { body }) => {
        if (error){
            cllback('Unable to connect to weather service.', undefined)
        }
        else if (body.error) {
            cllback('Unable to display forecast for this location.', undefined)
            console.log(url)
        }
        else {
            cllback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. "
                       + "There is a " + body.currently.precipProbability + "% chance of rain. High: " + body.daily.data[0].temperatureHigh +
                        ". Low: " + body.daily.data[0].temperatureLow + ".")
        }
    })
}

export default forecast