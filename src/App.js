import './App.css';
import React from 'react';
import Login from './Login';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

function App() {
const [{token }, dispatch] = useDataLayerValue(); 
 
  React.useEffect( function () {
   const hash = getTokenFromUrl();   
   window.location.hash = "";       
   let _token = hash.access_token; 

   if(_token){
    spotify.setAccessToken(_token); 
    dispatch({
      type: 'SET_TOKEN',
      token: _token,                
    })

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,            
    });

     spotify.getMe().then(user => {  //get the current user from API
      dispatch({
        type: 'SET_USER',
        user: user                                                 
       });
    });

      spotify.getUserPlaylists().then((playlists) => dispatch({ 
        type: 'SET_PLAYLISTS',
        playlists: playlists, 
      }));

      spotify.getMyTopArtists().then((response) =>  
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    );

      spotify.getPlaylist('37i9dQZEVXcOhjhB66I4nc').then((response) => 
      dispatch({
        type: 'SET_DISCOVER_WEEKLY',
        discover_weekly: response,
      }))
   }
  }, [token, dispatch]) //render this useEffect any time the token or the dispatch changes 


  // console.log(user); //fetching the user from the data layer - read from data layer

  return (
    // <div className="app">{token ? (<Player spotify={spotify} />) : (<Login />)}
    <div className="app">
         {!token && <Login />}
         {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
