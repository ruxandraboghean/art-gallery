import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import user from '../images/user.png';

export const Search = () => {
  return (
    <div className='search'>
      <div className='search-form'>
        <div className='search-icon'>
          <FontAwesomeIcon icon={ faSearch } />
        </div>
        <div className='search-text'>
          <input type="text" placeholder="Find a user" />
        </div>
      </div>
      <div className='user-chat'>
        <img src={user} />
        <div className='user-chat-info'>
          <span>Jane Doe</span>
        </div>
      </div>
    </div>
  )
}
