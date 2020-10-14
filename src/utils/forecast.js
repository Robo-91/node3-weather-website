const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=005f18d4b0e32358c259f9f87ef46aad&query=' + longitude + ',' + latitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined);
        }  else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;