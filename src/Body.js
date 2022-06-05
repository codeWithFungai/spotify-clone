import PlayCircleOutlined from '@mui/icons-material/PlayCircleOutlined';
import React from 'react'
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:0cXXmvgtSC6SDZd3VQqlcf`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className='body'>
      <Header spotify={spotify} />
      <div body__info>
      <img src={discover_weekly?.images[0].url} alt="" />
      <div className='body__infoText'>
           <strong>PLAYLIST</strong>
           <h2>Discover Weekly</h2>
           <p>{discover_weekly?.description}</p>
      </div>
      </div>
      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon onClick={playPlaylist} className='body__shuffle' />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>

    </div>
    
  )
}

export default Body