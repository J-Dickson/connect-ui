import React from 'react'
import './account.css'
import Header from './Header'

class Account extends React.Component {
  render () {
    // const {name, age, city, about, numberOfConnections }= this.props
    const name = 'Manuel'
    const age = ''
    const city = 'Gangelt'
    const about = 'Lorem ipsum dolor sit amet, te dicam diceret luptatum ius, ea usu autem fuisset, prodesset efficiendi interpretaris nam eu.'
    const numberOfConnections = '0'
    const image = 'https://inmotion.adrivo.com/images/300/uploads/user/fcb/599d260455943_preview.jpg'
    return (
      <div className='account'>
        <Header showBurger={true} />
        <div className='account__header'>
          <Image image={image} />
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
      {numberOfConnections && numberOfConnections !== '0' &&
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
  <div className='account__image--container'>
    {image
      ? <img src={image} className='account__image' />
      : <i className='fa fa-user' aria-hidden='true' />
    }
    <a href='#' className='camera'>
      <i className='fa fa-camera' aria-hidden='true' />
    </a>
  </div>
)
export default Account
