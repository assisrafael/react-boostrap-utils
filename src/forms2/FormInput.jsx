import React from 'react';
import PropTypes from 'prop-types';

import { booleanOrFunction } from '../forms/helpers/form-helpers';

import { useFormControl2 } from './helpers/useFormControl';
import { FormGroup2 } from './FormGroup';
export function FormInput2({ type, name, required: _required, disabled: _disabled, afterChange, ..._attrs }) {
  const { getValue, handleOnChangeFactory, getFormData } = useFormControl2(name);

  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  const attrs = {
    ..._attrs,
    disabled,
    name,
    required,
    type,
  };

  if (type === 'datetime-local') {
    attrs.defaultValue = getValue();
  } else {
    attrs.value = getValue();
  }

  return <input {...attrs} className="form-control" onChange={handleOnChangeFactory(afterChange)} />;
}

FormInput2.defaultProps = {
  type: 'text',
};

FormInput2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.string,
  min: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  step: PropTypes.string,
  type: PropTypes.string,
};

export function FormGroupInput2(props) {
  return (
    <FormGroup2 {...props}>
      <FormInput2 {...props} />
    </FormGroup2>
  );
}

FormGroupInput2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  max: PropTypes.string,
  maxLength: PropTypes.string,
  min: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  step: PropTypes.string,
  type: PropTypes.string,
};
