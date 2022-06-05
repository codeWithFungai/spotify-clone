import React from 'react';
import './SidebarOption.css';

function SidebarOption({ title, icon }) {
  return (
    <div className='sidebarOption'>
        {icon && <div className='sidebarOption__icon'>{icon}</div>}
        {icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  )
}

export default SidebarOption