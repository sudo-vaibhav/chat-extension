import React from 'react'

const MessageComponent = ({ message, twoStickersInARow, isMine }) => {
  return (
    <div className="mx-2 flex-grow">
      <div className="my-1">
        {message.type === 'gif' || message.type === 'image' ? (
          <img src={message.content} className="w-full rounded-lg" />
        ) : message.type === 'video' ? (
          <video controls>
            <source src={message.content}></source>
          </video>
        ) : message.type === 'text' ? (
          <div
            className={`text-sm p-2 bg-gray-200 rounded-lg ${
              isMine ? 'rounded-br-none' : 'rounded-bl-none'
            }`}
          >
            {message.content}
            <div className="flex text-xs text-gray-500 justify-end">
              {message.getTime()}
            </div>
          </div>
        ) : message.type === 'sticker' ? (
          <div className={twoStickersInARow ? 'w-full' : 'w-1/2'}>
            <img src={message.content} className={`rounded-lg w-full`} />
            <div className="flex text-xs bg-gray-200 rounded-lg rounded-bl-none p-1 text-gray-500 justify-end">
              {message.getTime()}
            </div>
          </div>
        ) : // :

        // message.type === "image" ?

        null}
      </div>
    </div>
  )
}

export default MessageComponent
