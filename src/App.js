import React from 'react'
import Header from './components/Header'
import PinnedMessage from './components/PinnedMessage'
import Chat from './components/Chat'
import ChatBox from './components/ChatBox'
import bg from './bg.png'

function App() {
  return (
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
        <Header />
        <PinnedMessage />
        <Chat />
        <ChatBox />
      </div>
    </div>
  )
}

export default App
