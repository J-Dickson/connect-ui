import React from 'react'
import './Messages.css'
import Header from './Header.js'
import smiley from '../assets/smiley.png'

class Messages extends React.Component {
  render () {
    return (
      <div className='messages'>
        <Header showBurger />
        <div className='messages__main'>

          <SpeechBubble direction='from' />
          <SpeechBubble direction='to' />
          <SpeechBubble direction='to' />
          <SpeechBubble direction='to' />
          <SpeechBubble direction='from' />
          <div className='messages__text-input'>
            <div className='chat-add'><i class='fa fa-plus' aria-hidden='true' /></div>
            <textarea type='text' className='chat-input' />
            <img src={smiley} className='smiley' />
            <div className='chat-send' />
          </div>
        </div>
      </div>
    )
  }
}

const SpeechBubble = ({direction}) => (
  <div className={`speech-bubble speech-bubble--${direction}`}>
    Good Chat uao;fbao o;qg o;qrg ;jbea jba j ja eni aernoae p
  </div>
)

export default Messages
