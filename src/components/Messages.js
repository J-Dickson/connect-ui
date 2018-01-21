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
            <a href='#' className='chat-add'><i class='fa fa-plus' aria-hidden='true' /></a>
            <textarea type='text' className='chat-input' />
            <div className='input-right'>
              <a href='#'><img src={smiley} className='smiley' /></a>
              <a href='#' className='chat-send'>Send</a>
            </div>
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
