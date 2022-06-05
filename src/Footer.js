import React from 'react'
import './Footer.css';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined';
import BluetoothConnectedOutlinedIcon from '@mui/icons-material/BluetoothConnectedOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { Grid, Slider } from '@mui/material';
import { useDataLayerValue } from './DataLayer';

function Footer( { spotify }) {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();

  React.useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {   
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => { 
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className='footer'>
      <div className='footer__left'>
       <div>
         <img className='footer__albumlogo' src={item?.album.images[0].url} alt={item?.name} />
       </div>
       {item ? (
         <div className='footer__songInfo'>
         <h4>{item.name}</h4>
         <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
         </div>
         ) : (
          <div className="footer__songInfo">
          <h4>No song is playing</h4>
          <p>...</p>
        </div>
         )}
      </div>
      <div className='footer__center'>
      <ShuffleIcon className='footer__green' />
      <SkipPreviousIcon onClick={skipNext} className='footer__icon' />
      {playing ? (
          <PauseCircleOutlineOutlinedIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlinedIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
      <SkipNextIcon onClick={skipPrevious} className='footer__icon' />
      <ReplayIcon className='footer__green' />
      </div>
      <div className='footer__right'>
      <Grid container spacing={2}>
      <Grid item>
       <MicNoneOutlinedIcon />
       </Grid>
       <Grid item>
       <QueueMusicOutlinedIcon />
       </Grid>
       <Grid item>
       <BluetoothConnectedOutlinedIcon />
       </Grid>
       <Grid item>
       <VolumeDownOutlinedIcon />
       </Grid>
       <Grid item xs>
        <Slider aria-labelledby="continuous-slide" />
      </Grid>
      </Grid>

      </div>
    </div>
  )
}

export default Footer