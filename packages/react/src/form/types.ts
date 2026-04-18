import { BaseProps, DirectionType } from '../_utils/props';
import React from 'react';
import FormInstance, { FormErrors, FormValues } from './form-instance';

export type Rule = {
  // specific type
  type?: 'string' | 'number' | 'boolean';

  // error message. auto generate by template if not provided
  message?: string;

  // type required: max length of string, number, array
  max?: number;

  // type required: min length of string, number, array
  min?: number;

  // required field
  required?: boolean;

  // match enum value
  enum?: any[];

  // length of string, number, array
  len?: number;

  // regex pattern
  pattern?: RegExp;

  // transform value to the rule before validation
  transform?: (value: any) => any;

  // customize validation rule.
  validator?: (value: any) => boolean;

  // failed if only has whitespace
  whitespace?: boolean;
};

export interface FormItemProps extends BaseProps {
  name?: string;
  required?: boolean;
  colon?: boolean;
  label?: React.ReactNode;
  rules?: Rule[];
  helper?: React.ReactNode;
  notice?: React.ReactNode;
  valuePropName?: string;
  valueGetter?: (...args: any[]) => any;
  labelCol?: number | { span: number; offset: number };
  wrapperCol?: number | { span: number; offset: number };
  children?: React.ReactNode;
}

export type FormLayout = DirectionType | 'inline';

export type ValidateTrigger = 'onChange' | 'onBlur' | 'onSubmit';

export interface FormOptionsProps {
  labelCol: number | { span: number; offset: number };
  wrapperCol: number | { span: number; offset: number };
  validateTrigger: ValidateTrigger;
  layout: FormLayout;
}

export interface FormProps
  extends BaseProps,
    Partial<FormOptionsProps>,
    React.ComponentPropsWithoutRef<'form'> {
  form?: FormInstance;
  initialValues?: FormValues;
  onFinish?: (values: FormValues) => void;
  onFinishFailed?: ({ values, errors }: { values: FormValues; errors: FormErrors }) => void;
}
