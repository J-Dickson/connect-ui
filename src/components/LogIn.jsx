import React from 'react'
import './LogIn.css'
import logo from '../assets/fcb-dhl-logo.png'
import Header from './Header.js'
import {Link} from 'react-router-dom'

class LogIn extends React.Component{
  render () {
    return (
      <div className='log-in'>
        <Header />
        <div className='log-in__container'>
          <div className='log-in__header'>
            Welcome to the FC Bayern Global Family
          </div>
          <div className='log-in__info'>
            If you have already submitted a selfie to the FC Bayern selfie wall
            you are already a member, meaning you can log in here:
          </div>
          <Input title='E-mail' type='log-in' />
          <Input title='Password' type='password' />
          <div className='buttons'>
            <Link to='/connect' className='log-in__button button'>
                Log in
            </Link>
          </div>
          Not a member yet?
          <div className='buttons'>
            <Link type='submit' to='/register' className='log-in__button button'>
              Join the Family!
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
const Input = ({title, type}) => (
  <div className='log-in__options'>
    {title}
    <input type={type} className='log-in__input' />
  </div>
)
export default LogIn
