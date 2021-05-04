import React from 'react'

const MessageComponent = ({ message, twoStickersInARow }) => {
  return (
    <div className="mx-2 flex-grow">
      <div className="my-1">
        {message.type === 'gif' ? (
          <img src={message.content} className="w-full" />
        ) : message.type === 'text' ? (
          <div className="text-sm p-2 bg-gray-200 rounded-lg rounded-bl-none">
            {message.content}
          </div>
        ) : message.type === 'sticker' ? (
          <img
            src={message.content}
            className={`rounded-lg
              ${twoStickersInARow ? 'w-full' : 'w-1/2'}
              `}
          />
        ) : null}
        <div className="text-xs">
          {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
        </div>
      </div>
    </div>
  )
}

export default MessageComponent
