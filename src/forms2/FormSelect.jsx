import React from 'react';
import PropTypes from 'prop-types';

import {
  booleanOrFunction,
  getOptionsType,
  getSelectedOption,
  normalizeOptions,
  serializeValue,
} from '../forms/helpers/form-helpers';

import { useFormControl2 } from './helpers/useFormControl';
import { FormGroup2 } from './FormGroup';
export function FormSelect2({
  name,
  options,
  required: _required,
  placeholder,
  trackBy,
  disabled: _disabled,
  afterChange,
  ..._attrs
}) {
  const { getFormData, getValue, handleOnChangeFactory } = useFormControl2(name);
  const value = getValue();

  const normalizedOptions = normalizeOptions(options, getFormData());
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  const attrs = {
    ..._attrs,
    disabled,
    name,
    required,
  };

  return (
    <select
      {...attrs}
      className="custom-select"
      onChange={handleOnChangeFactory(afterChange, getOptionsType(normalizedOptions))}
      value={getSelectedOption(value, normalizedOptions, trackBy)}
    >
      <option value="">{placeholder}</option>
      {renderOptions(normalizedOptions, trackBy)}
    </select>
  );
}

FormSelect2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.string.isRequired }),
      ])
    ),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trackBy: PropTypes.string,
};

export function FormGroupSelect2(props) {
  return (
    <FormGroup2 {...props}>
      <FormSelect2 {...props} />
    </FormGroup2>
  );
}

FormGroupSelect2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.node.isRequired,
        }),
      ])
    ),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trackBy: PropTypes.string,
};

function renderOptions(options, trackBy) {
  return options.map(({ value, label }, index) => (
    <option key={index} name={trackBy} value={serializeValue(value)}>
      {label}
    </option>
  ));
}
