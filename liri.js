var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');//File system
var keys = require("./key.js");


// Calling all API keys 
// var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotify;
var omdbApiKey = keys.omdbApiKey.apikey
// Test api key calling
// console.log("OMDB: " + omdbApiKey + "\n-------------\n" + "Twitter: " + twitterKeys + "\n-------------\n" + "Spotify: " + spotifyKeys);

// Function for inserting date adn time into the log File.
function formatDate() {
    var d = new Date();
    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " "
        + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    return d;
}
// console.log("Log captured data-time: " + formatDate(new Date()));

// log file that captures data
var writeToLog = function (data) {
    this.dateTime = formatDate(new Date());
    fs.appendFile("log.txt", "\n-------------\n");
    fs.appendFile("log.txt", dateTime);
    fs.appendFile("log.txt", '\r\n\r\n');
    fs.appendFile("log.txt", JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("log.txt file has been updated");
    });
}

//user choice/input logic re-director
var inputpick = function (caseData, fnData) {
    switch (caseData) {
        case 'do-what-it-says':
            random();
            break;
        default:
            console.log(`LIRI does not know that`);
        case 'movie-this':
            omdbMovie(fnData);
            break;
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            songsFromSpotify(fnData);
            break;
    }
}

// random choice function
var random = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        writeToLog(data);
    });
}

//movie choice function
var omdbMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = 'Mr Nobody';
    }
    var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json&apikey=" + omdbApiKey;
    request(movieURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = [];
            var jsonData = JSON.parse(body);
            data.push({
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
            console.log(data);
            writeToLog(data);
        }
    });
}

// tweet function
var myTweets = function () {
    var client = new twitter(keys.twitterKeys);
    var params = { screen_name: 'cognos4john', count: 10 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var data = []; //empty array to hold data
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            console.log(data);
            writeToLog(data);
        }
    });
};

//Creates a function for finding artist name from spotify
var getArtistNames = function (artist) {
    return artist.name;
};

//Function for finding songs on Spotify
var songsFromSpotify = function (songName) {
    //If it doesn't find a song, find Blink 182's What's my age again
    if (songName === undefined) {
        songName = 'What\'s my age again';
    };
    var spotify = new Spotify(spotifyKeys);
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        var songsData = [];
        for (var i = 0; i < songs.length; i++) {
            songsData.push({
                'artist(s)': songs[i].artists.map(getArtistNames),
                'song name: ': songs[i].name,
                'preview song: ': songs[i].preview_url,
                'album: ': songs[i].album.name,
            });
        }
        console.log(songsData);
        writeToLog(songsData);
    });
};

//argument picker
var runThis = function (paramOne, paramTwo) {
    inputpick(paramOne, paramTwo);
};

runThis(process.argv[2], process.argv[3]);