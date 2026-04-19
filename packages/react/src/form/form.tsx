import React, { useContext } from 'react';
import classNames from 'classnames';
import { FormInstanceContext } from './form-instance-context';
import { FormOptionsContext } from './form-options-context';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { FormProps } from './types';
import FormInstance from './form-instance';

const Form = React.forwardRef<HTMLFormElement, FormProps>((props, ref): JSX.Element => {
  const {
    initialValues = {},
    labelCol = { span: 8, offset: 0 },
    wrapperCol = { span: 16, offset: 0 },
    validateTrigger = 'onChange',
    layout = 'horizontal',
    form,
    onFinish,
    onFinishFailed,
    className,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('form', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, `${prefixCls}_${layout}`);
  // If you want to control the form outside, namely get the form instance, just pass a form store.
  // Otherwise, the form component will manage the state internally.
  const formRef = React.useRef(form ? form : new FormInstance(initialValues));

  const formOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formIns = formRef.current;
    formIns.validateFields();
    const values = formIns.getFieldValues();
    const errors = formIns.getFieldErrors();
    if (Object.keys(errors).some((key) => errors[key].length > 0)) {
      onFinishFailed && onFinishFailed({ values, errors });
    } else {
      onFinish && onFinish(values);
    }
  };

  const formOnReset = () => {
    formRef.current.resetFields();
  };

  return (
    <FormInstanceContext.Provider value={formRef.current}>
      <FormOptionsContext.Provider value={{ labelCol, wrapperCol, validateTrigger, layout }}>
        <form {...otherProps} ref={ref} className={cls} onSubmit={formOnSubmit} onReset={formOnReset}>
          {children}
        </form>
      </FormOptionsContext.Provider>
    </FormInstanceContext.Provider>
  );
});

Form.displayName = 'Form';

export default Form;
