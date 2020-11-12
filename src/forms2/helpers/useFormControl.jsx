import { isFunction } from 'js-var-type';
import { useCallback, useContext, useEffect, useState } from 'react';
import { decode, getTargetValue } from '../../forms/helpers/form-helpers';
import { FormContext } from './useFormHelper';

export function useFormControl2(name, type) {
  const formHelper = useContext(FormContext);
  const [value, _setValue] = useState('');

  const setValue = useCallback(
    (newValue) => {
      _setValue(newValue);
      formHelper.notify(name, newValue);
    },
    [formHelper, name]
  );

  const handleOnChange = useCallback(
    ({ target }, _type) => {
      const value = getTargetValue(target);

      const decodedValue = decode(value, type || _type);

      setValue(decodedValue);

      return decodedValue;
    },
    [setValue, type]
  );

  useEffect(() => {
    formHelper.register(name, {
      setValue: _setValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getValue() {
      return value;
    },
    setValue,
    handleOnChangeFactory: (afterChange, type) => (e) => {
      const newValue = handleOnChange(e, type);

      if (isFunction(afterChange)) {
        afterChange(newValue);
      }
    },
    getFormData() {
      return formHelper.getFormData();
    },
  };
}
