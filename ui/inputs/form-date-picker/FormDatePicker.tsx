import { FieldPath, FieldValues } from 'react-hook-form';

import {
  FormDatePicker as XpmFormDatePicker,
  FormDatePickerProps as XpmFormDatePickerProps,
} from '@xpmarket/xpm.ui.inputs.form-date-picker';

import { ErrorText } from '../common/ErrorText';

export const FormDatePicker = <
  TDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Omit<
    XpmFormDatePickerProps<TDate, TFieldValues, TName>,
    'ErrorComponent'
  >
): JSX.Element => {
  return <XpmFormDatePicker {...props} ErrorComponent={ErrorText} />;
};
