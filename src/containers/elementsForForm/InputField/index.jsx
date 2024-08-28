import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '../../../utils/formattedText';

function InputField({ label, name, value, onChange, onKeyDown }) {
  const inputRef = useRef(null);

  return (
    <li className="list-group-item">
      <label
        htmlFor={`${formattedText(name, 'camelCase')}Input`}
        className="form-label"
      >
        {formattedText(label, 'camelCase')} :
      </label>
      <input
        type="text"
        id={`${name}Input`}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
    </li>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

export default InputField;
