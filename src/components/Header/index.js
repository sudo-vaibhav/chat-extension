import React from 'react'

const Header = () => {
  return (
    <header
      className="flex py-2 justify-center border-b-2 bg-light-500"
      style={
        {
          // boxShadow: '0px 5px 13px -4px rgba(0,0,0,0.45)',
        }
      }
    >
      <div className="text-center ">
        <h1 className="font-semibold">Google Meet</h1>
        <h5 className="text-sm text-gray-400">4 members</h5>
      </div>
    </header>
  )
}

export default Header
