import React from 'react'
import MapHelper from '../helpers/MapHelper'
import Api from '../helpers/Api'
import Header from './Header'
import SettingsModal from './SettingsModal.jsx'
import './LocalMap.css'

class LocalMap extends React.Component {
  constructor (props) {
    super(props)
    this.mapContainer = null
    this.map = null
    this.state = {
      userList: [],
      poi: [],
      mappedUsers: []
    }
  }
  componentDidMount () {
    this.map = MapHelper.instantiateMap(this.mapContainer)
    Api.getPoiByRadius().then(res => {
      this.setState({
        userList: res.data.userList,
        poi: res.data.poiList,
        mappedUsers: res.data.mapped_users
      })
    })
  }
  componentDidUpdate (nextProps, nextState) {
    MapHelper.getUserMarkers(this.map, this.state.userList)
    MapHelper.getPlaceMarkers(this.map, this.state.poi)
    MapHelper.createHeatMapSource(this.map, this.state.mappedUsers)
    MapHelper.getHeatMapLayer(this.map)
  }
  componentWillUnmount () {
    this.map.remove()
  }
  render () {
    return (
      <div>
        <Header showBurger={true} />
        <div className='container'>
          <div ref={el => this.mapContainer = el} />
          <SettingsModal />
        </div>
      </div>
    )
  }
}

export default LocalMap
