import React from 'react'
import './settings.css'
import cog from '../assets/settings.png'

class SettingsModal extends React.Component {
  render () {
    return (
      <div id='cog'>
        <img src={cog} />
      </div>
    )
  }
}

export default SettingsModal
