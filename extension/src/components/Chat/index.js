import React, { useEffect, useState, useContext } from 'react'
import faker from 'faker/locale/en_IND'
import MessageGroupComponent from './MessageGroup'
import office from './MessageGroup/Message/office.gif'
import bassi from './MessageGroup/Message/bassi.gif'
import doge from './MessageGroup/Message/doge.webp'
import sloth from './MessageGroup/Message/sloth.webp'
import PinnedMessage from './PinnedMessage'
import ChatBox from './ChatBox'
import { SocketContext } from '../../App'
import { MESSAGE_TYPES } from '../../constants'

class User {
  constructor(id, name, avatar) {
    this.id = id
    this.name = name
    this.avatar = avatar
  }
}

const me = new User('69', 'Vaibhav Chopra', faker.image.avatar())

/**
 * A message is the basic building block of a chat
 * @constructor
 * @param {MessageType} type - tells about how to message has to be rendered
 */
class Message {
  constructor(type, content, timestamp = Date.now(), replyTo = null) {
    this.type = type
    this.content = content
    this.replyTo = replyTo
    this.timestamp = timestamp
  }

  getTime() {
    return new Date(this.timestamp).toLocaleTimeString().slice(0, 5)
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

const ChatComponent = () => {
  const { socket } = useContext(SocketContext)
  const [messageGroups, setMessageGroups] = useState([])

  const myMessageGroup = new MessageGroup(
    me,
    new Message(MESSAGE_TYPES.gif, bassi, 1620130405864),
  )

  myMessageGroup.addMessage(
    new Message(
      MESSAGE_TYPES.image,
      'https://i.ibb.co/ctLk9Ph/659593db-8cb1-4f41-b687-06905db85527.jpg',
      1620130465900,
    ),
  )
  myMessageGroup.addMessage(
    new Message(
      MESSAGE_TYPES.video,
      'https://firebasestorage.googleapis.com/v0/b/raize-baa4f.appspot.com/o/WhatsApp%20Video%202021-04-18%20at%201.12.58%20PM.mp4?alt=media',
      1620130465900,
    ),
  )

  const yourMessageGroup = new MessageGroup(
    new User('123', 'John Wick', faker.image.avatar()),
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
  yourMessageGroup.addMessage(
    new Message(
      MESSAGE_TYPES.text,
      'I have watched it like 10 times already',
      1620130405900,
    ),
  )
  yourMessageGroup.addMessage(
    new Message(MESSAGE_TYPES.sticker, doge, 1620130405930),
  )

  useEffect(() => {
    console.log('setting up to listen to roam broadcasted messages')
    socket.on('message', (data) => {
      setMessageGroups((messageGroups) => {
        console.log('a message arrived in the room', data)
        const messageData = data.message
        const message = new Message(messageData.type, messageData.content)
        console.log('messageGroups', messageGroups)
        const messageGroupsLength = messageGroups.length
        if (messageGroupsLength > 0) {
          console.log('messageGroups was not empty')
          const lastMessageGroup = messageGroups[messageGroupsLength - 1]
          if (lastMessageGroup.sender.id === me.id) {
            console.log('last message was from me')
            lastMessageGroup.addMessage(message)

            return [
              ...messageGroups.slice(0, messageGroupsLength - 1),
              lastMessageGroup,
            ]
          }
        }

        console.log('messageGroups were empty / last messageGroup was not mine')
        const messageGroup = new MessageGroup(data.sender, message)
        return [...messageGroups, messageGroup]
      })
    })
    // setMessageGroups([...messageGroups, myMessageGroup, yourMessageGroup])
  }, [socket])

  return (
    <>
      <PinnedMessage />
      <div
        style={{ maxHeight: 380 }}
        className="flex-grow flex w-full flex-col p-2 overflow-y-scroll"
      >
        {messageGroups.map((messageGroup, idx) => {
          return (
            <MessageGroupComponent
              messageGroup={messageGroup}
              key={idx}
              style={{
                marginTop: idx === 0 ? 'auto !important' : null,
              }}
            />
          )
        })}
      </div>
      <ChatBox />
    </>
  )
}

export default ChatComponent
export { me }
