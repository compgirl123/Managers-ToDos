import React from 'react';
import './WarningMessage.scss';

/**
 * WarningMessage Component
 * This Component is used to define what appears when there is an error in the app.
 */
export const WarningMessage = (props) => {
  const {warning, warningMessage} = props;

  return (
    <div className = "warningMessage">
      {warning && <p>
        {warningMessage}
      </p>}
    </div>
  )
}
