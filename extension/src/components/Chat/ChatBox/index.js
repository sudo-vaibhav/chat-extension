import React, { useContext, useState } from 'react'
import FeatherIcon from 'feather-icons-react'
import { SocketContext, WINDOW_WIDTH } from '../../../App'
import { MESSAGE_TYPES } from '../../../constants'
import { me } from '../index'
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

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

  // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
  const gf = new GiphyFetch('yPK1WOxUsg7GNCPIKQ8rR6nWAJbH29Q4')
  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
  const fetchGifs = (offset) => gf.trending({ offset, limit: 10 })

  return (
    <div>
      <div
        style={{ maxHeight: 200, overflow: 'auto', scrollbarWidth: 'none' }}
        className="overflow-auto p-2"
      >
        {/* <Grid
          width={WINDOW_WIDTH * 0.9}
          columns={2}
          fetchGifs={fetchGifs}
          // gutter={0}
          hideAttribution={true}
        /> */}
      </div>

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
            <FeatherIcon icon="layers" size={14} />
          </div>
        </div>
        <div>
          <FeatherIcon
            size={18}
            icon={sendTextAllowed ? 'send' : 'mic'}
            onClick={sendTextAllowed ? sendTextMessage : null}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
