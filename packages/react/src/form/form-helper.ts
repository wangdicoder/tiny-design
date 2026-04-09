import React from 'react';
import { Rule } from './types';

export function getPropName(valueProp: string | ((type: any) => string), type: any) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp;
}

export function getValueFromEvent(...args: any[]): any {
  const e = args[0] as React.ChangeEvent<any>;
  return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
}

export function validate(value: any, rule: Rule): string | undefined {
  const {
    message,
    required,
    max,
    min,
    enum: enumVal,
    len,
    pattern,
    transform,
    type,
    validator,
    whitespace,
  } = rule;
  const val = transform ? transform(value) : value;

  if (required && (val === undefined || val === null || val === '')) {
    return message || 'The value is required';
  }
  if (type && typeof val !== type) {
    return message || `The value is not a ${type}`;
  }
  if (max || len) {
    const segment = (max || len) as number;
    if (typeof val === 'number' && val > segment) {
      return message || 'The value is greater than the max';
    } else if ((typeof val === 'string' || Array.isArray(val)) && val.length > segment) {
      return message || 'The length of value is greater than the max';
    }
  }
  if (min) {
    if (typeof val === 'number' && val < min) {
      return message || 'The value is less than the min';
    } else if ((typeof val === 'string' || Array.isArray(val)) && val.length < min) {
      return message || 'The length of value is less than the min';
    }
  }
  if (enumVal && !enumVal.includes(val)) {
    return message || 'The value is not in the enum';
  }
  if (pattern && !pattern.test(val)) {
    return message || 'The value does not find a match';
  }
  if (validator) {
    const res = validator(val);
    if (!res) {
      return message || 'The value is validated unsuccessfully';
    }
  }
  if (whitespace && typeof val === 'string' && val.trim().length <= 0) {
    return message || 'The input contains whitespace';
  }

  return undefined;
}
