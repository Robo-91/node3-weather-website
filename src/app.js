const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { handlebars } = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup up Handlebars Engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather App',
        name: 'Robert Palmer'
     });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Robert Palmer'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'I need somebody to help!!!',
        name: 'Robert Palmer'
    })
});

app.get('/weather', (req, res) => {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        } else if (!req.query.address) {
            return res.send({
                error: 'You must provide an address'
            });
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return console.log(error);
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', { 
        error: 'Help Article Not found', 
        name: 'Robert Palmer' 
    });
});

app.get('*', (req, res) => {
    res.render('404', { 
        error: 'Page Not Found', 
        name: 'Robert Palmer' 
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});