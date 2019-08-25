require("dotenv").config();
var keys = require("./keys.js");
//moment package
var moment = require("moment");
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var fs = require("fs")


//var for sportify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.keys.spotify);
var songName = "";

//Band Variabble
bandName = "";

// Store all of the arguments in an array
var input = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";
if (input[2] === 'movie-this') {
  movieName = input[3]
  if (!movieName) {
    movieName = "Mr. Nobody"
    console.log("If you haven't watched Mr. Nobody, then you should:  http://www.imdb.com/title/tt0485947/ on Netflix")

  }
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=" + keys.keys.omdbkey.omdb;


  axios.get(queryUrl).then(
    function (response) {
      var thisMovieData = 
      "Title: " + response.data.Title +
      "\n\nRelease year: " + response.data.Year + 
      "\n\nIMDB Rating: " + response.data.imdbRating +
      "\n\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
      "\n\nCountry: " + response.data.Country +
      "\n\nLanguage: " + response.data.Language +
      "\n\nPlot: " + response.data.Plot +
      "\n\nActors: " + response.data.Actors

      // Append thismovieData to log.txt, print showData to the console
      fs.appendFile("log.txt", thisMovieData, function(err) {
        if (err) throw err;

          console.log(thisMovieData);
          console.log("\nData added to log.txt")
      });

    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {

        console.log(error.request);
      } else {

        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}


else if (input[2] === "spotify-this-song") {
  songName = input[3]
  if (!songName) {
    songName = "crazy"
  }
  //Spotify
  spotify.search({ type: 'track', query: songName })
    .then(function (response) {


      var spotifyData = "_____________"+
      "\nArtist: " + response.tracks.items[0].artists[0].name +
      "\n\nSong's Name: " + response.tracks.items[0].name +
      "\n\nAlbum Name: " + response.tracks.items[0].album.name +
      "\n\nPreview Link: " + response.tracks.items[0].preview_url+
      "\n____________________"

      // Append thismovieData to log.txt, print showData to the console
      fs.appendFile("log.txt", spotifyData, function(err) {
        if (err) throw err;
          console.log(spotifyData);
          console.log("\nData added to log.txt")
            
      });  

    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {

        console.log(error.request);
      } else {

        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

else if (input[2] === "concert-this") {
  bandName = input[3]
  if (!bandName) {
    bandName = "Metallica"
  }
  var Url = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

  axios.get(Url).then(
    function (response) {
      for (let i = 0; i < 5; i++) {

        var dateFormatted = moment(response.data[i].datetime).format("MM/DD/YYYY")

        var concertData = 
          
          "\nVenue: " + response.data[i].venue.name+
          "\n\nVenue Location: " + response.data[i].venue.city+
          "\n\nDate: " + dateFormatted +
          "\n______________________"
        
          // Append thismovieData to log.txt, print showData to the console
          fs.appendFile("log.txt", concertData, function(err) {
            if (err) throw err;
              console.log(concertData);
              console.log("\nData added to log.txt")
            
        });
    }

    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {

        console.log(error.request);
      } else {

        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}


//do what it says?
else if (input[2] === 'do-what-it-says') {
  fs.readFile("random.txt", "utf8", function (error, data) {
    var randomArray = data.split(",")

    var inputRef = randomArray[0];
    var userRequest = randomArray[1];

    //if statement
    //inputRef = Spotify this song
    if (input[3] === "spotify-this-song") {
      spotify.search({ type: 'track', query: userRequest })
        .then(function (response) {

          var spotifyData = 
            "Artist: " + response.tracks.items[0].artists[0].name +
            "\n\nSong's Name: " + response.tracks.items[0].name +
            "\n\nAlbum Name: " + response.tracks.items[0].album.name +
            "\n\nPreview Link: " + response.tracks.items[0].preview_url
          
            // Append thismovieData to log.txt, print showData to the console
            fs.appendFile("log.txt", spotifyData, function(err) {
              if (err) throw err;
                console.log(spotifyData);
                console.log("\nData added to log.txt")          
            });

        }).catch(function (error) {

          console.log(error.config);
        });
    }
    //concert-this
    else if (input[3] === "concert-this") {
      var Url = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp"

      axios.get(Url).then(
        function (response) {
          for (let i = 0; i < 5; i++) {
            var dateFormatted = moment(response.data[i].datetime).format("MM/DD/YYYY")

            var concertData = 
              "\nVenue: " + response.data[i].venue.name +
              "\n\nVenue Location: " + response.data[i].venue.city+
              "\n\nDate: " + dateFormatted +
              "\n__________________________"
              fs.appendFile("log.txt", concertData, function(err) {
                if (err) throw err;
                  console.log(concertData);
                  console.log("\nData added to log.txt")          
              });
            

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    //movie-this
    else if(input[3] === "movie-this"){

      var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&r=json&apikey=" + keys.keys.omdbkey.omdb;

      axios.get(queryUrl).then(
        function (response) {

          var thisMovieData = 
            "Title: " + response.data.Title +
            "\n\nRelease year: " + response.data.Year + 
            "\n\nIMDB Rating: " + response.data.imdbRating +
            "\n\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\n\nCountry: " + response.data.Country +
            "\n\nLanguage: " + response.data.Language +
            "\n\nPlot: " + response.data.Plot +
            "\n\nActors: " + response.data.Actors

            fs.appendFile("log.txt", thisMovieData, function(err) {
              if (err) throw err;
                console.log(thisMovieData);
                console.log("\nData added to log.txt")          
            });
    
        })
        .catch(function(error){
          console.log(error)
        });

    }

    // fs Read
    if (error) {
      return console.log(error);
    }

    console.log()
  })
}
