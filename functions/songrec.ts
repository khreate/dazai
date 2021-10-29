import axios from "axios"; // import axios
var SpotifyWebApi = require('spotify-web-api-node'); // import spotify-web-api-node

var spotifyApi = new SpotifyWebApi({ // create new spotify-web-api-node object
    clientId: process.env.cid,
    clientSecret: process.env.cs,
    redirectUri: 'http://localhost:3000/callback'
});


