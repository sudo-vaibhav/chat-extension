import React from 'react'
import FeatherIcon from 'feather-icons-react'

const PinnedMessage = () => {
  return (
    <div className="flex p-2 bg-light-500 justify-between text-sm border-b-2 ">
      <div className="flex-grow overflow-hidden ">
        <h6 className="text-blue-500 text-xs">Pinned Message</h6>
        <p className="overflow-ellipsis whitespace-nowrap">
          Other board members please append your names if you agree
        </p>
      </div>
      <div className="text-blue-500 ml-4 grid place-items-center">
        <FeatherIcon icon="bookmark" size={18} fill="rgb(59, 130, 246)" />
      </div>
    </div>
  )
}

export default PinnedMessage
