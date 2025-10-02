import React from 'react';

function Input({ type = 'text', id, placeholder, value, onChange, required }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default Input;