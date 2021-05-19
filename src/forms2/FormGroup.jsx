import React from 'react';
import PropTypes from 'prop-types';

import { FormLabel2 } from './FormLabel';
import { FormHelp2 } from './FormHelp';

export function FormGroup2({ children, name, help, ...props }) {
  return (
    <div className="form-group">
      <FormLabel2 {...props} />
      {children}
      {help && <FormHelp2 message={help} />}
    </div>
  );
}

FormGroup2.defaultProps = {
  feedback: true,
  mockInvalidSibling: false,
};

FormGroup2.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  help: PropTypes.node,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};
