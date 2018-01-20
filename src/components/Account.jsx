import React from 'react'
import './account.css'
import Header from './Header'

class Account extends React.Component {
  render () {
    // const {name, age, city}= this.props
    const name = 'Rachel'
    const age = '22'
    const city = 'London'
    const about = 'Lorem ipsum dolor sit amet, te dicam diceret luptatum ius, ea usu autem fuisset, prodesset efficiendi interpretaris nam eu.'
    const numberOfConnections = '3'
    return (
      <div className='account'>
        <Header />
        <div className='account__header'>
          <Image />
          <div className='account__main'>
            <Info title='Name' value={name} titleClassName='account__main--title' />
            <Info title='Age' value={age} titleClassName='account__main--title' />
            <Info title='City' value={city} titleClassName='account__main--title' />
          </div>
        </div>
        <div className='account__details'>
          <Info title='About me' value={about} titleClassName='account__details--title' textClassName='account__about' />
          <Connections title='Connections' href='#' chatHref='#' numberOfConnections={numberOfConnections} />
          <Connections title='Your Activity' href='#' />
        </div>
        <a href='#' className='account__edit'>
          <i class='fa fa-pencil' aria-hidden='true' />
        </a>
      </div>
    )
  }
}
const Info = ({ title, value, titleClassName, textClassName = '' }) => (
  <div className='info'>
    <span className={titleClassName}>
      {title}:
    </span>
    <div className={textClassName}> {value} </div>
  </div>
)

const Connections = ({ numberOfConnections, title, href, chatHref }) => (
  <div className='account__details--connections'>
    <div className='connections__title'>
      {numberOfConnections &&
        <a href={chatHref} className='connections__number' >
          {numberOfConnections}
        </a>
      }
      <div>{title} </div>
    </div>
    <div className='connections__button'>
      <a href={href} className='connections__link'> View </a>
    </div>
  </div>
)

const Image = ({ image }) => (
  <div className='account__image'>
    {!image &&
    <i className='fa fa-user' aria-hidden='true' />
    }
    <a href='#' className='camera'>
      <i className='fa fa-camera' aria-hidden='true' />
    </a>
  </div>
)
export default Account
