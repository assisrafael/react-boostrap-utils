import React from 'react';
import { isFunction, isUndefined, isArray, isObject } from 'js-var-type';
import { getValueByPath } from '../../utils/getters-setters';

export const FormContext = React.createContext(null);

export function validateFormElement({ name, validations = [], formData, elementRefs }) {
  let validationMessage = '';
  const value = getValueByPath(formData, name);

  validations.some(({ message, validate }) => {
    const isValid = validate(value, formData);

    if (!isValid) {
      validationMessage = message;
    }

    return !isValid;
  });

  for (const elementRef of elementRefs) {
    if (!elementRef) {
      continue;
    }

    elementRef.setCustomValidity(validationMessage);
  }

  return validationMessage;
}

export function handleInputChange(formState, event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  formState.update(name, value);
}

export function normalizeOptions(options, formData, extraData) {
  const _options = isFunction(options) ? options(formData, extraData) : options;

  if (!isArray(_options)) {
    throw new Error('Select Options should be an array');
  }

  return _options.map((option) => ({
    value: isUndefined(option.value) ? option : option.value,
    label: isUndefined(option.label) ? serializeValue(option) : option.label,
  }));
}

export function booleanOrFunction(property, formData) {
  if (!isFunction(property)) {
    return property;
  }

  return property(formData);
}

export function serializeValue(value) {
  if (!isObject(value)) {
    return value.toString();
  }

  return JSON.stringify(value);
}

export function getSelectedOption(value, options, trackBy) {
  let selectedValue = value;

  if (trackBy) {
    const selectedOption = options.find(
      (option) => getValueByPath(option.value, trackBy) === getValueByPath(value, trackBy)
    );

    if (selectedOption) {
      selectedValue = selectedOption.value;
    }
  }

  return serializeValue(selectedValue);
}

export function getOptionsType(options) {
  return options.length > 0 ? typeof options[0].value : undefined;
}
