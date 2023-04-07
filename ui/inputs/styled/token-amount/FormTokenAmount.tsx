import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { InputBaseComponentProps } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { FormNumberField } from '@ui/inputs/form-number-field/FormNumberFIeld';

import { TokensDropdown } from './TokensDropdown';
import { TokenDropdownOption } from './types';

interface Props<
  TOption extends TokenDropdownOption,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  label: string;
  amountName: TName;
  dropdownName: TName;
  control: Control<TFieldValues>;
  onAmountChange: (value: number | undefined) => void;
  onBalanceClick: () => void;
  options: TOption[];
  balance: number;
  isBalanceLoading: boolean;
  isDropdownDisabled?: boolean;
  decimalScale?: number;
  maxLength?: number;
  inputProps?: InputBaseComponentProps;
  onTokenChange?: (option: TOption | undefined) => void;
}

export const FormTokenAmount = <
  TOption extends TokenDropdownOption,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Props<TOption, TFieldValues, TName>
): JSX.Element => {
  const {
    label,
    amountName,
    dropdownName,
    control,
    onAmountChange,
    onTokenChange,
    maxLength,
    onBalanceClick,
    options,
    inputProps,
    balance,
    isBalanceLoading,
    decimalScale,
    isDropdownDisabled = false,
  } = props;
  return (
    <FormNumberField
      variant="big"
      color="secondary"
      name={amountName}
      control={control}
      label={label}
      allowNegative={false}
      allowLeadingZeros={false}
      onChange={onAmountChange}
      maxLength={maxLength}
      decimalScale={decimalScale}
      autoComplete="off"
      sx={styles.getValue('numberInput')}
      inputProps={inputProps}
      InputProps={{
        endAdornment: (
          <TokensDropdown
            control={control}
            name={dropdownName}
            balance={balance}
            isDisabled={isDropdownDisabled}
            isLoading={isBalanceLoading}
            onBalanceClick={onBalanceClick}
            onTokenChange={onTokenChange}
            options={options}
          />
        ),
      }}
    />
  );
};

const styles = new SxStyles({
  inputWrapper: {
    bgcolor: (theme) =>
      theme.palette.mode === 'dark'
        ? theme.palette.card.main
        : theme.palette.background.paper,
    borderRadius: 2,
  },
  numberInput: {
    '.number-container > .MuiFormControl-root > .MuiInputBase-root.MuiOutlinedInput-root':
      {
        fontSize: 20,
      },
  },
});
