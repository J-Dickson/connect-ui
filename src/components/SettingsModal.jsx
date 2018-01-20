import React from 'react'
import './settings.css'
import cog from '../assets/settings.png'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Switch from 'react-toggle-switch'
import "react-toggle-switch/dist/css/switch.min.css"

class SettingsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false, radius: 10, personSwitch: true, POIswitch: true }
  }
  handleOnChange (value, that) {
    that.setState({
      radius: value
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
              onChange={(value) => this.handleOnChange(value, this)} />
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
    )
  }
}

export default SettingsModal
