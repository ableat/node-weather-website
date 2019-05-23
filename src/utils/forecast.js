const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1023eda4d96d67a931f77985468b3f63/' + encodeURIComponent(latitude + ", " + longitude)
    request( {url, json : true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service.', undefined)
        }
        else if (body.error) {
            callback('Unable to display forecast for this location.', undefined)
            console.log(url)
        }
        else {
            callback(undefined, " It is currently " + body.currently.temperature + " degrees out. "
                       + "There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast