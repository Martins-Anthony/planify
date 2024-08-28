import React from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '../../../utils/formattedText';

function Button({ label, onClick, className = '' }) {
  return (
    <button type="button" className={`btn ${className}`} onClick={onClick}>
      {formattedText(label, 'firstLetterUppercase')}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
