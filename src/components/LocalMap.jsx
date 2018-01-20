import React from 'react'
import MapHelper from '../helpers/MapHelper'
import Api from '../helpers/Api'
import Header from './Header'
// import SettingsModal from './SettingsModal.jsx'
import './LocalMap.css'
import './settings.css'
import cog from '../assets/settings.png'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Switch from 'react-toggle-switch'
import "react-toggle-switch/dist/css/switch.min.css"

class LocalMap extends React.Component {
  constructor (props) {
    super(props)
    this.mapContainer = null
    // this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.map = null
    this.state = {
      count: null,
      userList: [],
      poi: [],
      mappedUsers: [],
      currentUser: {
        location: {
          geoPoint: {
            lon: 11.624509900000001,
            lat: 48.2188412
          }
        },
        firstName: 'Zooby'
      },
      showModal: false,
      radius: 10,
      personSwitch: true,
      POIswitch: true
    }
  }
  componentDidMount () {
    this.map = MapHelper.instantiateMap(this.mapContainer, this.state.currentUser.location.geoPoint.lon, this.state.currentUser.location.geoPoint.lat)
    Api.getPoiByRadius().then(res => {
      this.setState({
        userList: res.data.userList,
        poi: res.data.poiList,
        mappedUsers: res.data.mapped_users
      })
    })
    setTimeout(() => this.setState({count: 1}), 10000)
  }
  componentDidUpdate (nextProps, nextState) {
    if (nextState.userList.length === this.state.userList.length && nextState.poi.length === this.state.poi.length) return
    MapHelper.getUserMarkers(this.map, this.state.userList, this.state.currentUser)
    MapHelper.getPlaceMarkers(this.map, this.state.poi)
    if (!this.map.getSource('mapped-users')) {
      MapHelper.createHeatMapSource(this.map, this.state.mappedUsers)
    }
    MapHelper.getHeatMapLayer(this.map)
    MapHelper.drawCircle(this.map, this.state.currentUser.location.geoPoint.lon, this.state.currentUser.location.geoPoint.lat, 2500)
  }
  componentWillUnmount () {
    this.map.remove()
  }
  handleOnChange (value, that) {
    that.setState({
      radius: value
    })
  }
  handleChangeComplete () {
    Api.getPoiByRadius(this.state.radius).then(res => {
      this.setState({
        userList: res.data.userList,
        poi: res.data.poiList,
        mappedUsers: res.data.mapped_users
      })
    })
  }
  togglePerson () {
    this.setState(prevState => {
      return {
        personSwitch: !prevState.personSwitch
      }
    })
  }
  togglePOI () {
    this.setState(prevState => {
      return {
        personSwitch: !prevState.POIswitch
      }
    })
  }
  render () {
    return (
      <div>
        <Header showBurger count={this.state.count} />
        <div className='container'>
          <div ref={el => this.mapContainer = el} />
          {this.state.showModal && <div className='modal'>
            <ul>
              <li>Radius: {this.state.radius} km</li>
            </ul>
            <div id='slider'>
              <Slider
                min={1}
                max={100}
                tooltip={false}
                value={this.state.radius}
                labels={{1: '1', 50: '50', 100: '100'}}
                onChange={(value) => this.handleOnChange(value, this)}
                onChangeComplete={(value) => this.handleChangeComplete(value)} />
            </div>
            <div id='switches'>
              <ul>
                <li className='my-switch'>Show Fans: <Switch className='switch' onClick={this.togglePerson.bind(this)} on={this.state.personSwitch} /></li>
                <li className='my-switch'>Show POIs: <Switch className='switch' onClick={this.togglePOI.bind(this)} on={this.state.POIswitch} /></li>
              </ul>
            </div>

          </div>}
          {!this.state.showModal && <div id='cog' onClick={() => this.setState({showModal: true})}>
            <img src={cog} />
          </div>}
          {this.state.showModal && <div id='cog__cross' onClick={() => this.setState({showModal: false})}>
            <i class='fa fa-times fa-2x' aria-hidden='true' />
          </div>}
        </div>
      </div>
    )
  }
}

export default LocalMap
