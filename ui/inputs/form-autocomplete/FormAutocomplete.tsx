import { FieldPath, FieldValues } from 'react-hook-form';

import {
  FormAutocomplete as XpmFormAutocomplete,
  FormAutocompleteProps as XpmFormAutocompleteProps,
} from '@xpmarket/xpm.ui.inputs.form-autocomplete';
import { Option, OptionValue } from '@xpmarket/xpm.ui.inputs.types';

import { ErrorText } from '../common/ErrorText';

export const FormAutocomplete = <
  OValue extends OptionValue,
  EnhancedOption extends Option<OValue>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: Omit<
    XpmFormAutocompleteProps<
      OValue,
      EnhancedOption,
      TFieldValues,
      TName,
      DisableClearable,
      FreeSolo
    >,
    'ErrorComponent'
  >
): JSX.Element => {
  return <XpmFormAutocomplete {...(props as any)} ErrorComponent={ErrorText} />;
};
