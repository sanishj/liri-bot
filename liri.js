var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require("./key.js");


// Calling all API keys 
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotify;
var omdbApiKey = keys.omdbApiKey.apikey
// Test api key calling
console.log("OMDB: " + omdbApiKey + "\n-------------\n" + "Twitter: " + twitterKeys + "\n-------------\n" + "Spotify: " + spotifyKeys);

/*var getMeMovie = function(movieName) {

        if (movieName === undefined) {
            movieName = 'Mr Nobody';
        }

        var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

        request(movieURL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var movieData = [];
                var jsonData = JSON.parse(body);

                movieData.push({
                    'Title: ': jsonData.Title,
                    'Year: ': jsonData.Year,
                    'Rated: ': jsonData.Rated,
                    'IMDB Rating: ': jsonData.imdbRating,
                    'Country: ': jsonData.Country,
                    'Language: ': jsonData.Language,
                    'Plot: ': jsonData.Plot,
                    'Actors: ': jsonData.Actors,
                    'Rotten Tomatoes Rating: ': jsonData.tomatoRating,
                    'Rotton Tomatoes URL: ': jsonData.tomatoURL,
                });
                console.log(movieData);
                writeToLog(movieData);
            }
        });*/