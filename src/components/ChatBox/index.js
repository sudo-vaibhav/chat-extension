import React from 'react'
import FeatherIcon from 'feather-icons-react'

const ChatBox = () => {
  return (
    <div className="flex items-center p-2 border-t-2 text-gray-500">
      <div>
        <FeatherIcon icon="paperclip" size={18} />
      </div>
      <div className="flex-grow relative">
        <p contentEditable className="rounded-full border-2 mx-2 px-2 py-1"></p>
        <div className="absolute top-0 right-0 pr-5 py-3">
          <FeatherIcon icon="layers" size={14} />
        </div>
      </div>
      <div>
        <FeatherIcon icon="headphones" size={18} />
      </div>
    </div>
  )
}

export default ChatBox
