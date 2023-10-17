import React, { useState } from 'react';
import './InputField.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputIcon } from './InputField.style.js';

/**
 * InputField Component
 * This Component contains the Code for the Input Field
 * This is a reusable Component taht can be used for many pages.
 */
export const InputField = (props) => {

  const {id, type, placeholder, onChange, value, label, icon} = props;

  return (
    <>
    <div className="input-field">
      <input
        id={id}
        type={type}
        className='todo-input'
        placeholder={placeholder}
        onChange = {onChange}
        value = {value}
      />
      </div>
    </>
  )
}
