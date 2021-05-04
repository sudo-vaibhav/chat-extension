import React from 'react'
import faker from 'faker/locale/en_IND'
import MessageGroupComponent from './MessageGroup'
import office from './MessageGroup/Message/office.gif'
import bassi from './MessageGroup/Message/bassi.gif'
import doge from './MessageGroup/Message/doge.webp'
import sloth from './MessageGroup/Message/sloth.webp'

/**
 * @typedef {string} MessageType
 */

/**
 * @enum {MessageType}
 */
const MESSAGE_TYPES = { gif: 'gif', text: 'text', sticker: 'sticker' }

/**
 * A message is the basic building block of a chat
 * @constructor
 * @param {MessageType} type - tells about how to message has to be rendered
 */
class Message {
  constructor(type, content, timestamp, replyTo = null) {
    this.type = type
    this.content = content
    this.replyTo = replyTo
    this.timestamp = timestamp
  }
}

/**
 * A collection of messages
 */
class MessageGroup {
  messages = []

  constructor(sender, message) {
    this.sender = sender
    this.messages.push(message)
  }

  addMessage(message) {
    this.messages.push(message)
  }
}

/**
 * a collection of message groups that combine to make a conversation
 */
class Chat {
  messageGroups = []

  constructor(firstMessageGroup) {
    this.messageGroups.push(firstMessageGroup)
  }

  addMessageGroup(messageGroup) {
    this.messageGroups.push(messageGroup)
  }
}

const ChatComponent = () => {
  const myMessageGroup = new MessageGroup(
    {
      avatar: faker.image.avatar(),
      id: '69',
    },
    new Message(MESSAGE_TYPES.gif, bassi, 1620130405864),
  )

  const yourMessageGroup = new MessageGroup(
    {
      avatar: faker.image.avatar(),
      id: '123',
    },
    new Message(MESSAGE_TYPES.gif, office, 1620130405894),
  )

  yourMessageGroup.addMessage(
    new Message(
      MESSAGE_TYPES.text,
      'bro, I like this episode so much 😂',
      1620130405900,
    ),
  )
  yourMessageGroup.addMessage(
    new Message(MESSAGE_TYPES.sticker, doge, 1620130405904),
  )
  yourMessageGroup.addMessage(
    new Message(MESSAGE_TYPES.sticker, sloth, 1620130405930),
  )
  const chat = new Chat(myMessageGroup)

  chat.addMessageGroup(yourMessageGroup)

  return (
    <div className="flex-grow flex w-full flex-col justify-end p-2 overflow-y-auto">
      {chat.messageGroups.map((messageGroup) => {
        return <MessageGroupComponent messageGroup={messageGroup} />
      })}
    </div>
  )
}

export default ChatComponent
