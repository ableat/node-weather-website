const request = require('request')

const geocode = (address, cllback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3JlZ2Vja2hhcnQiLCJhIjoiY2p2bnJxcG4wMDNlYjQ0cWxxNm1rN2E5ayJ9.Uk5j5HKkwnFnbFWYRBieSQ'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cllback('Unable to connect to location services.', undefined)
    } else if (body.features.length === 0) {
      cllback('Unable to find location. Try another search.', undefined)
    } else {
      cllback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
