import React from 'react';
import { Button1 } from './Button.style.js';

/**
 * Button Component
 * This Component contains the Code for a Button Component
 * This is a reusable Component taht can be used for many pages.
 */
export const Button = (props) => {

  const {type, onClick, isDisabled, children} = props;

  return (
    <div>
      <Button1 type={type}
        onClick={onClick}
        disabled = {isDisabled}>{children}
      </Button1>
    </div>
  )
}
