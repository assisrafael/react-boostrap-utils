import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormTextarea({ id, name, required, placeholder, rows }) {
  const formState = useContext(FormContext);

  function onChange(e) {
    const { name, value } = handleInputChange(e);

    formState.update(name, value);
  }

  return (
    <textarea
      {...{ required, name, id, placeholder, rows }}
      className="form-control"
      onChange={onChange}
      value={formState.getValue(name) || ''}
    ></textarea>
  );
}

FormTextarea.defaultProps = {
  rows: 5,
};

FormTextarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};
