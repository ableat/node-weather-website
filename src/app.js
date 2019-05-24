const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//environment variable, set by Heroku or 3000 for local
const port = process.env.PORT || 3000

//set up Handlebars engine and views location
app.set('views', viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//Express route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Greg Eckhart'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Greg Eckhart'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        email: 'email@email',
        name: 'Greg Eckhart'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        })
    } else {
        geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error){
                return res.send({ error })
            }  
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error: 'Forecase data unavailable'
                    })
                }
        
               res.send({
                   forecast: forecastData,
                   location,
                   address: req.query.address
               })
              })
        })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        name: 'Greg Eckhart',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'Greg Eckhart',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})