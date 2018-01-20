import React from 'react'
import './account.css'
import Header from './Header'

class Account extends React.Component {
  render () {
    return (
      <div className='account'>
        <Header />
        <div className='account__header'>
          <div className='account__image'>
            This should be blank
          </div>
        </div>
      </div>
    )
  }
}

export default Account
