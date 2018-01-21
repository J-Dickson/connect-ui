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
    this.map = null
    this.state = {
      count: null,
      userList: [],
      poi: [],
      mappedUsers: [],
      currentUser: {
        location: {
          geoPoint: {
            lon: -73.935242,
            lat: 40.730610
          }
        },
        firstName: 'David',
        image: '//inmotion.adrivo.com/images/300/uploads/user/fcb/599d256c926ba_preview.jpg'
      },
      showModal: false,
      radius: 5,
      personSwitch: true,
      POIswitch: true
    }
  }
  componentDidMount () {
    this.map = MapHelper.instantiateMap(this.mapContainer, this.state.currentUser.location.geoPoint.lon, this.state.currentUser.location.geoPoint.lat)
    this.makeServiceCall(this.state.radius, this.state.currentUser.location.geoPoint)
  }
  componentDidUpdate (nextProps, nextState) {
    if (nextState.userList.length === this.state.userList.length && nextState.poi.length === this.state.poi.length) return
    MapHelper.drawCircle(this.map, this.state.currentUser.location.geoPoint.lon, this.state.currentUser.location.geoPoint.lat, (this.state.radius * 1000))
    MapHelper.getUserMarkers(this.map, this.state.userList, this.state.currentUser)
    MapHelper.getPlaceMarkers(this.map, this.state.poi)
    if (!this.map.getSource('mapped-users')) {
      MapHelper.createHeatMapSource(this.map, this.state.mappedUsers)
    }
    MapHelper.getHeatMapLayer(this.map)
  }
  componentWillUnmount () {
    this.map.remove()
  }
  makeServiceCall (radius = 200, lonLat) {
    Api.getPoiByRadius(radius, lonLat).then(res => {
      this.setState({
        userList: res.data.userList,
        poi: res.data.poiList,
        mappedUsers: res.data.mapped_users
      })
    })
  }
  setMapZoom () {
    this.map.setZoom(10)
    setTimeout(() => this.setState({count: 1}), 2000)
  }
  handleOnChange (value, that) {
    that.setState({
      radius: value
    })
  }
  handleChangeComplete () {
    MapHelper.removeAllMarkers()
    MapHelper.removeAllPoiMarkers()
    MapHelper.removeMapRadius()
    this.setMapZoom()
    this.setState({
      showModal: false
    })
    this.makeServiceCall(this.state.radius, this.state.currentUser.location.geoPoint)
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
