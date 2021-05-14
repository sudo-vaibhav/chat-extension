import React, { useContext, useState } from 'react'
import FeatherIcon from 'feather-icons-react'
import { SocketContext } from '../../../App'
import { MESSAGE_TYPES } from '../../../constants'
import { me } from '../index'

const ChatBox = () => {
  const { socket } = useContext(SocketContext)
  const [textMessage, setTextMessage] = useState('')
  const sendTextAllowed = textMessage.length !== 0

  const sendTextMessage = () => {
    console.log('sending message:', textMessage)
    socket.emit('message', {
      url: window.location.href,
      message: {
        content: textMessage,
        type: MESSAGE_TYPES.text,
      },
      sender: me,
    })
  }

  return (
    <div className="flex items-center p-2 border-t-2 text-gray-500">
      <div>
        <FeatherIcon icon="paperclip" size={18} />
      </div>
      <div className="flex-grow relative flex">
        <input
          contentEditable
          value={textMessage}
          className="rounded-full border-2 mx-2 px-2 py-1 flex-grow"
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <div className="absolute top-0 right-0 pr-5 py-3">
          <FeatherIcon
            icon={sendTextAllowed ? 'send' : 'layers'}
            size={14}
            onClick={sendTextAllowed ? sendTextMessage : null}
          />
        </div>
      </div>
      <div>
        <FeatherIcon icon="mic" size={18} />
      </div>
    </div>
  )
}

export default ChatBox
