import { FieldPath, FieldValues } from 'react-hook-form';

import {
  FormNumberField as XpmFormNumberField,
  FormNumberFieldProps as XpmFormNumberFieldProps,
} from '@xpmarket/xpm.ui.inputs.form-number-field';

import { ErrorText } from '../common/ErrorText';

export const FormNumberField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Omit<XpmFormNumberFieldProps<TFieldValues, TName>, 'ErrorComponent'>
): JSX.Element => {
  return <XpmFormNumberField {...props} ErrorComponent={ErrorText} />;
};
