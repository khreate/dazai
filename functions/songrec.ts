import axios from "axios"; // import axios




// var spotifyApi = new SpotifyWebApi({ // create new spotify-web-api-node object
//     clientId: process.env.cid,
//     clientSecret: process.env.cs,
//     redirectUri: 'http://localhost:3000/callback'
// });


export function songrec(genre: string, artist: string, song: string) {
    var song_id = song.substring(31, 52) // gets song id given link
    var artist_id = artist.substring(32,54) // gets artist id given link)
    console.log(song_id)
    console.log(artist_id)


    return axios.get(`https://api.spotify.com/v1/recommendations?limit=1&market=US&seed_genres=${genre}&seed_artists=${artist_id}&seed_tracks=${song_id}`, {
        headers: {
            'Authorization': 'Bearer ' + process.env.bearer
        }
        
    }).then(function (response) {
        console.log(response.data.tracks[0])
        return console.log(response.data.tracks[0].name)
    }

)}