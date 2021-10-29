import axios from "axios";

export function songrec(song: string, artist: string, genre: string) {
    console.log(axios.get(`https://api.spotify.com/v1/recommendations?limit=1&market=ES&seed_artists=${artist}&seed_genres=${genre}&seed_tracks=${song}" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAaIp0-h_b2cPem2yZ-OP-hvduJagOxn6rg0MZCHVhLORSUraGhWale8kvDs4shbeLBVyhwDQF4210bUzrK0y_kKUdQoJTs2ubZh_355JY7uVzbhnIP7ZH7DE-4O821zI0hic7NK96IXfxT3s3Yyxs16UF46_RstaJi8_lWTBM_FBDyucAmTHi0iwBdfEZWoeId1nx30ZLsu8-s`)
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
)}