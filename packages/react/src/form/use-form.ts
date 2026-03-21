import { useRef } from 'react';
import FormInstance, { FormValues } from './form-instance';

export default function useForm(initialValues: FormValues = {}): [FormInstance] {
  const ref = useRef<FormInstance | null>(null);
  if (!ref.current) {
    ref.current = new FormInstance(initialValues);
  }
  return [ref.current];
}
