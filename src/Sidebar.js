import React from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import { useDataLayerValue } from './DataLayer';

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  return (
    <div className='sidebar'>
          <img  className='sidebar__logo' src={require('./spotifyLogo2.png')} alt='spotify logo' />
          <SidebarOption 
            title="Home" 
            icon={<HomeIcon />}
            />
          <SidebarOption 
          title="Search"
          icon={<SearchOutlinedIcon />} 
          />
          <SidebarOption 
          title="Your Library"
          icon={<LibraryMusicOutlinedIcon />}
          />
          <br />
          <strong className='sidebar__title'>PLAYLISTS</strong>
          <hr />
          {playlists?.items?.map((playlist) => (
          <SidebarOption title={playlist.name} />
          ))}
    </div>

  )
}

export default Sidebar