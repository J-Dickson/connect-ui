import React from 'react'
import './header.css'
import logo from '../assets/fcb-dhl-logo.png'

class Header extends React.Component {
  render () {
    return (
      <div className='header'>
        <nav role='navigation'>
          <div id='menuToggle'>
            <input type='checkbox' />
            <i id='close-menu' class="fa fa-times fa-3x" aria-hidden="true"></i>
            <span />
            <span />
            <span />
            <ul id='menu'>
              <a href="#"><i class="fa fa-home fa-fw" aria-hidden="true"></i><li>&nbsp; Connect</li></a>
              <a href="#"><i class="fa fa-comment-o fa-fw" aria-hidden="true"></i><li>&nbsp; Messages</li></a>
              <a href="#"><i class="fa fa-user-circle-o fa-fw" aria-hidden="true"></i><li>&nbsp; Profile</li></a>
              <br></br>
              <a href="#"><i class="fa fa-camera fa-fw" aria-hidden="true"></i><li>&nbsp; Submit a selfie</li></a>
              <a href="#"><i class="fa fa-trophy fa-fw" aria-hidden="true"></i><li>&nbsp; Competitions</li></a>
              <a href="#"><i class="fa fa-futbol-o fa-fw" aria-hidden="true"></i><li>&nbsp; FC Bayern</li></a>
            </ul>
          </div>
        </nav>
        <div id='logo'>
          <img src={logo} />
        </div>
      </div>
    )
  }
}

export default Header
