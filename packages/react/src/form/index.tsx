import Form from './form';
import FormItem from './form-item';
import useForm from './use-form';
import FormInstance from './form-instance';

type IForm = typeof Form & {
  Item: typeof FormItem;
  useForm: typeof useForm;
  FormInstance: typeof FormInstance;
};

const DefaultForm = Form as IForm;
DefaultForm.Item = FormItem;
DefaultForm.useForm = useForm;
DefaultForm.FormInstance = FormInstance;

export default DefaultForm;
export type * from './types';
