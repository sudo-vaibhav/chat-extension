import React from 'react'
import FeatherIcon from 'feather-icons-react'

const Header = ({ onClick }) => {
  return (
    <header
      className="flex py-2 justify-between border-b-2 bg-light-500 px-2 items-center relative"
      style={
        {
          // boxShadow: '0px 5px 13px -4px rgba(0,0,0,0.45)',
        }
      }
    >
      <div
        className="flex items-center rounded-full text-xs bg-blue-500 text-white p-2"
        onClick={onClick}
      >
        <FeatherIcon icon="mic" size={14} />
        <div className="ml-2">Audio</div>
      </div>
      <div className="text-center absolute top-0 bottom-0 w-full text-center">
        <h1 className="font-semibold">Google Meet</h1>
        <h5 className="text-sm text-gray-400">4 members</h5>
      </div>
      <div>
        <FeatherIcon icon="lock" />
      </div>
    </header>
  )
}

export default Header
