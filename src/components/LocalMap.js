import React from 'react'
import mapboxgl from 'mapbox-gl'
import './LocalMap.css'
import geojson from '../data/BigHaq'

class LocalMap extends React.Component {
  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamQ5MTIiLCJhIjoiY2pjbWYzbzdxMDN4YTJ5bzBrc2VvdDl6ciJ9.0Cutw6rZNaP2pY58wj1V1w'
    const map = new mapboxgl.Map({
      container: 'local-map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [11.576124, 48.137154],
      zoom: 8
    })
    geojson.features.forEach(marker => {
      // create a HTML element for each feature
      let el = document.createElement('div')
      el.className = 'fa fa-user marker'

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map)
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
