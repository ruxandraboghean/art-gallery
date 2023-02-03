import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo-default.png';
import background from '../images/background.png';

export const Register = () => {
  return (
    <>
    <div className='form-container'>
        <div className='form-wrapper center'>
            <div className='center'>
                <img src={logo} alt="Logo" className='logo' /> 
            </div>
            <div className='progress-bar'>
              
            </div>
            <form className='form'>
             <input type="text" placeholder='&#xF007;&nbsp;&nbsp; username' className='form-input' />
                <input type="email" placeholder='&#xf0e0;&nbsp;&nbsp; email' className='form-input' /> 
                <input type="password" placeholder='&#xf023;&nbsp;&nbsp; password'  className='form-input' />
                <input type="password" placeholder='&#xf023;&nbsp;&nbsp; confirm password'  className='form-input' />
                <button className='form-button'> 
                    <span className='text'>Next</span>
                    <FontAwesomeIcon icon={ faCircleArrowRight } className="fa-circle-arrow-right"/>
                </button>
            
            </form>
            <p className='form-paragraph'> Already have an account? <a href="/login"> Login </a> </p>
        </div>
        <div className='image-wrapper'>
            <img src={background} alt='Background' className='background' />
        </div>
    </div>
    </>
  )
}
