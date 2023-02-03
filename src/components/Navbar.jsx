import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='all-conversations'>
          Conversations
      </div>
      <div className='settings'>
          <FontAwesomeIcon icon ={ faGear } />
        </div>
    </div>
  )
}
