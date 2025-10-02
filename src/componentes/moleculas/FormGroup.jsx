import React from 'react';
import Label from '../atomos/Label';
import Input from '../atomos/Input';

function FormGroup({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default FormGroup;
