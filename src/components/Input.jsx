import { faCameraRetro, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder="Type something..." />
      <div className='send'>
        <FontAwesomeIcon icon={ faCameraRetro } />
        <input type='file' style={{display:"none"}} id="file" />
        <label htmlFor='file'>
         <FontAwesomeIcon icon={ faPaperclip} />
        </label>
        <button> 
          <span>Send</span> 
          <FontAwesomeIcon icon={ faPaperPlane } />
        </button>
      </div>
    </div>
  )
}
