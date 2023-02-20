import { ReactElement } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { Box, FormLabel, Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { DROPS_DECIMAL_SCALE } from '@xpmarket/xpm.system.xrpl';
import { Option, OptionValue } from '@xpmarket/xpm.ui.inputs.types';
import { NumberText } from '@xpmarket/xpm.ui.number.number-text';
import { FormAutocomplete } from '@ui/inputs/form-autocomplete/FormAutocomplete';

interface Props<
  TOption extends Option<OptionValue>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  balance: number;
  options: TOption[];
  onBalanceClick: () => void;
  onTokenChange?: (option: TOption | undefined) => void;
}

export const NftOfferDialogTokenInput = <
  TOption extends Option<OptionValue>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Props<TOption, TFieldValues, TName>
): ReactElement | null => {
  const { name, control, balance, options, onBalanceClick, onTokenChange } =
    props;
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
        control={control}
        disableClearable
        onChange={onTokenChange}
        options={options}
        disabled
        freeSolo
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
      WebkitTextFillColor: 'secondary.main',
    },
    '.MuiFormControl-root .MuiInputBase-root.MuiOutlinedInput-root': {
      fontSize: 13,
      bgcolor: 'indigo.main',
      color: 'secondary.main',

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
    color: 'vividCerise.main',
  },
});
