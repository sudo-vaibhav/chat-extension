import React, { useEffect, useState, createContext } from 'react'
import Header from './components/Header'
import Chat from './components/Chat'
import VoiceChat from './components/VoiceChat'
import bg from './bg.png'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

function App() {
  const [voiceChatOn, setVoiceChatOn] = useState(false)
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    try {
      const skt = io('http://localhost:8000', { path: '/socket.io/' })
      skt.on('connect', () => {
        console.log('connected', skt.id)
        const url = window.location.href
        console.log('joining room', url)
        skt.emit('joinRoom', url)
        setSocket(skt)
      })

      skt.on('connect_error', () => {
        console.log('connection error', skt.id)
      })
      skt.on('disconnect', () => {
        console.log('disconnected', skt.id) // undefined
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    socket && (
      <SocketContext.Provider value={{ socket, setSocket }}>
        <div
          className="h-screen w-screen grid place-items-center bg-black"
          style={{
            background: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className="flex flex-col bg-white"
            style={{
              height: 550,
              width: 400,
            }}
          >
            <Header onClick={() => setVoiceChatOn(!voiceChatOn)} />
            {voiceChatOn ? <VoiceChat /> : <Chat />}
          </div>
        </div>
      </SocketContext.Provider>
    )
  )
}

export { SocketContext }
export default App
