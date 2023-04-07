import { ReactElement } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { Box, FormLabel, Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { DROPS_DECIMAL_SCALE } from '@xpmarket/xpm.system.xrpl';
import { NumberText } from '@xpmarket/xpm.ui.number.number-text';
import { FormAutocomplete } from '@ui/inputs/form-autocomplete/FormAutocomplete';

import { TokensDropdownOptionRow } from './TokensDropdownOptionRow';
import { TokensDropdownPopper } from './TokensDropdownPopper';
import { TokenDropdownOption } from './types';

interface Props<
  TOption extends TokenDropdownOption,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  balance: number;
  isLoading: boolean;
  isDisabled: boolean;
  options: TOption[];
  onBalanceClick: () => void;
  onTokenChange?: (option: TOption | undefined) => void;
}

export const TokensDropdown = <
  TOption extends TokenDropdownOption,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Props<TOption, TFieldValues, TName>
): ReactElement | null => {
  const {
    name,
    isLoading,
    control,
    balance,
    options,
    onBalanceClick,
    isDisabled,
    onTokenChange,
  } = props;
  const { t } = useTranslation();

  return (
    <Stack position="relative" marginTop="-20px" maxWidth="150px" width="100%">
      <FormLabel
        sx={styles.getValue('balanceLabel')}
        focused={false}
        error={false}
      >
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Box>{t('common:nftOfferDialog.form.label.balance')}</Box>
          <Box onClick={onBalanceClick} sx={{ cursor: 'pointer' }}>
            <NumberText
              value={balance}
              rounding="floor"
              decimalScale={DROPS_DECIMAL_SCALE}
            />
          </Box>
        </Stack>
      </FormLabel>
      <FormAutocomplete
        name={name}
        loading={isLoading}
        control={control}
        disableClearable
        onChange={onTokenChange}
        options={options}
        disabled={isDisabled}
        freeSolo={isDisabled}
        PopperComponent={TokensDropdownPopper}
        renderOption={(props, option) => (
          <TokensDropdownOptionRow
            key={option.value}
            renderProps={props}
            option={option}
          />
        )}
        sx={styles.getValue('autocompleteInput')}
      />
    </Stack>
  );
};

const styles = new SxStyles({
  autocompleteInput: {
    maxWidth: '150px',
    pl: 1,
    bgcolor: 'transparent',

    '.MuiAutocomplete-root': {
      py: 0.5,
    },
    '.Mui-disabled': {
      WebkitTextFillColor: 'text.secondary',
    },
    '.MuiFormControl-root .MuiInputBase-root.MuiOutlinedInput-root': {
      fontSize: 13,
      bgcolor: (theme) =>
        theme.palette.mode === 'dark'
          ? theme.palette.card.main
          : theme.palette.background.paper,
      color: 'text.secondary',

      '.MuiSvgIcon-root': {
        color: 'inherit',
      },
    },
    '.MuiAutocomplete-root .MuiOutlinedInput-root': {
      py: (theme) => theme.spacing(0),
    },
    '.MuiFormLabel-root': {
      textAlign: 'end',
      px: 0,
    },
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: 'fontWeightRegular',
    color: 'text.secondary',
  },
});
