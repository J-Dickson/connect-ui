import React from 'react'
import MapHelper from '../helpers/MapHelper'
import './LocalMap.css'

class LocalMap extends React.Component {
  constructor (props) {
    super(props)
    this.mapContainer = null
    this.map = null
  }
  componentDidMount () {
    this.map = MapHelper.instantiateMap(this.mapContainer)
    MapHelper.getUserMarkers(this.map)
    MapHelper.getPlaceMarkers(this.map)
    this.map.on('style.load', () => {
      MapHelper.createHeatMapSource(this.map)
      MapHelper.getHeatMapLayer(this.map)
    })
  }
  componentWillUnmount () {
    this.map.remove()
  }
  render () {
    return (
      <div className='container'>
        <div ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

export default LocalMap
