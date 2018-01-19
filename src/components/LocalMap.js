import React from 'react'
import mapboxgl from 'mapbox-gl'
import './LocalMap.css'

class LocalMap extends React.Component {
  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamQ5MTIiLCJhIjoiY2pjbWYzbzdxMDN4YTJ5bzBrc2VvdDl6ciJ9.0Cutw6rZNaP2pY58wj1V1w'
    const map = new mapboxgl.Map({
      container: 'local-map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [11.576124, 48.137154]
    })
  }
  render () {
    return (
      <div className='container'>
        <div id='local-map'>
          poop
        </div>
      </div>
    )
  }
}

export default LocalMap
