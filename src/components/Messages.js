import React from 'react'
import './Messages.css'
import Header from './Header.js'
import pending from '../assets/pending.png'

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  messageSubmit (e, that) {
    e.preventDefault()
    const chat = that.refs.chat
    chat.value = ''
    console.log(this.state.count)
    if (this.state.count === 2) {
      this.setState({count: this.state.count + 1})
      setTimeout(() => this.setState({count: this.state.count + 1}), 2000)
    } else {
      this.setState({count: this.state.count + 1})
    }
  }

  render () {
    return (
      <div className='messages'>
        <Header showBurger />
        <div className='chat-title'>
          <p>Matthias<span>New York</span></p>
        </div>
        <div className='messages__main'>
          <div className='chat-messages'>
            <SpeechBubble direction='to' message='Hey mate. Watching the game later?' />
            { this.state.count > 0 && <SpeechBubble direction='from' message='Of course 😀⚽️🇩🇪' /> }
            { this.state.count > 1 && <SpeechBubble direction='from' message='Going to the Irish bar 🍺 Come along.' /> }
            { this.state.count > 2 && <SpeechBubble direction='from' message='Mia san mia!' /> }
            { this.state.count === 3 && <img id='message-pending' src={pending} /> }
            { this.state.count > 3 && <SpeechBubble direction='to' message='Great. See you there!' /> }
          </div>
          <div className='messages__text-input'>
            <a href='#' className='chat-add'><i class='fa fa-plus' aria-hidden='true' /></a>
            <form className='commentForm' onSubmit={(e) => this.messageSubmit(e, this)}>
              <input type='text' ref='chat' className='chat-input' />
            </form>
            <div className='input-right'>
              <a href='#' className='smiley'><i class='fa fa-smile-o' aria-hidden='true' /></a>
              <a href='#' className='chat-send'>Send</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const SpeechBubble = ({direction, message}) => (
  <div>
    <div className={`speech-bubble speech-bubble--${direction}`}>
      { message }
    </div>
    <div>
      { direction === 'to' && <img className='chat-img' src={'//inmotion.adrivo.com/images/300/uploads/user/fcb/59722271826e9_preview.jpg'} /> }
    </div>
  </div>
)

export default Messages
