import React from 'react'
import MessageComponent from './Message'
const MessageGroupComponent = ({ messageGroup }) => {
  // finding messages in message group where 2 stickers are present together
  const messages = messageGroup.messages
  const stickerIndices = []
  const toSkip = []
  for (let i = 0; i < messages.length - 1; i++) {
    if (messages[i].type === 'sticker' && messages[i + 1].type === 'sticker') {
      stickerIndices.push(i)
      i++
      toSkip.push(i)
    }
  }

  return (
    <div
      className={`flex items-end w-3/4 my-2 ${
        messageGroup.sender.id === '69' ? 'self-end flex-row-reverse' : ''
      }`}
    >
      <img
        src={messageGroup.sender.avatar}
        className="rounded-full"
        style={{
          width: 40,
          height: 40,
        }}
      />
      <div className="flex-grow">
        {messages.map((message, idx) => {
          if (stickerIndices.includes(idx)) {
            return (
              <div className="grid grid-cols-2 gap-1" key={idx}>
                <MessageComponent message={message} twoStickersInARow />
                <MessageComponent
                  message={messages[idx + 1]}
                  twoStickersInARow
                />
              </div>
            )
          } else if (!toSkip.includes(idx)) {
            return <MessageComponent message={message} key={idx} />
          }
          return null
        })}
      </div>
    </div>
  )
}

export default MessageGroupComponent
