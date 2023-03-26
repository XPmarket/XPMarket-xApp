import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFunction, useTranslation } from 'next-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import { useTokenBalance } from '@templates/common/useTokenBalance';
import { OfferCreateType } from '@xpmarket/xpm.api.xpmarket';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import {
  decodeToken,
  MAX_XRP_PAIR_NUMBER_LENGTH,
} from '@xpmarket/xpm.system.xrpl';
import { Button } from '@xpmarket/xpm.ui.buttons.button';
import { Option } from '@xpmarket/xpm.ui.inputs.types';
import { FormAutocomplete } from '@ui/inputs/form-autocomplete/FormAutocomplete';
import { FormDatePicker } from '@ui/inputs/form-date-picker/FormDatePicker';
import { FormNumberField } from '@ui/inputs/form-number-field/FormNumberFIeld';

import { SubmitMutationDto } from '../../../types';
import { DEFAULT_VALUES, NFT_OFFER_TOKEN_OPTIONS } from './constants';
import { ErrorReason } from './ErrorReason';
import { NftOfferDialogTokenInput } from './NftOfferDialogTokenInput';
import { schema } from './schema';
import { NftOfferSubmitFormValues } from './types';

interface Props {
  isLoading: boolean;
  type: OfferCreateType;
  onSubmit: (values: SubmitMutationDto) => void;
}

export const NftOfferDialogBodyForm: FC<Props> = (props) => {
  const { isLoading, type, onSubmit } = props;
  const { t } = useTranslation();
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { balance, isLoading: isBalanceLoading } = useTokenBalance('XRP');
  const durationOptions = makeDurationOptions(t);
  const [hasEnoughBalance, toggleBalance] = useState<boolean>(true);

  return (
    <Box
      component="form"
      onSubmit={formMethods.handleSubmit((values) =>
        handleSubmit(values as NftOfferSubmitFormValues)
      )}
      height="100%"
    >
      <Stack spacing={2}>
        <FormNumberField
          variant="big"
          color="secondary"
          name="amount"
          control={formMethods.control}
          label={t('common:nftOfferDialog.form.label.amount')}
          allowNegative={false}
          allowLeadingZeros={false}
          onChange={handleAmountChange}
          maxLength={MAX_XRP_PAIR_NUMBER_LENGTH}
          decimalScale={3}
          autoComplete="off"
          sx={styles.getValue('numberInput')}
          InputProps={{
            endAdornment: (
              <NftOfferDialogTokenInput
                control={formMethods.control}
                name="amountToken"
                balance={balance}
                onBalanceClick={handleBalanceClick}
                options={NFT_OFFER_TOKEN_OPTIONS}
              />
            ),
          }}
        />
        <Stack direction="row" spacing={1}>
          <FormAutocomplete
            name="duration"
            color="secondary"
            control={formMethods.control}
            label={t('common:nftOfferDialog.form.label.duration')}
            options={durationOptions}
            onChange={handleDurationChange}
          />
          <FormDatePicker
            name="date"
            color="secondary"
            control={formMethods.control}
            label={t('common:nftOfferDialog.form.label.date')}
            disablePast
            onChange={handleDateChange}
          />
        </Stack>
        <Stack
          spacing={1}
          px={{
            xs: 0,
            sm: 2,
          }}
          minHeight="80px"
          justifyContent="flex-end"
        >
          <ErrorReason hasNoBalance={!hasEnoughBalance} />
          <Button
            type="submit"
            fullWidth
            loading={isBalanceLoading || isLoading}
            disabled={!hasEnoughBalance}
            sx={{ mt: 'auto' }}
          >
            {t('common:nftOfferDialog.form.button.submit')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );

  function handleAmountChange(value: number | undefined): void {
    if (type === 'buy') {
      updateBalanceLimit(value, balance, toggleBalance);
    }
  }

  function handleBalanceClick(): void {
    formMethods.setValue('amount', balance);

    if (type === 'buy') {
      updateBalanceLimit(balance, balance, toggleBalance);
    }
  }

  function handleDurationChange(): void {
    formMethods.setValue('date', null);
  }

  function handleDateChange(): void {
    formMethods.setValue('duration', null);
  }

  function handleSubmit(values: NftOfferSubmitFormValues): void {
    const { code, issuer } = decodeToken(values.amountToken);

    onSubmit({
      amount: values.amount,
      currency: code,
      currencyIssuer: issuer,
      date: values.date ?? undefined,
      duration: values.duration ?? undefined,
      offerHash: undefined,
    });
  }
};

const updateBalanceLimit = (
  amount: number | undefined,
  balance: number,
  updateCallback: (value: boolean) => void
): void => {
  const hasEnoughBalance = !!amount ? amount <= balance : true;

  updateCallback(hasEnoughBalance);
};

const makeDurationOptions = (t: TFunction): Option<number>[] => {
  const options: Option<number>[] = [
    {
      label: t('common:day', { count: 1 }),
      value: 1,
    },
    {
      label: t('common:day', { count: 3 }),
      value: 3,
    },
    {
      label: t('common:month', { count: 1 }),
      value: 28,
    },
    {
      label: t('common:month', { count: 3 }),
      value: 84,
    },
    {
      label: t('common:month', { count: 6 }),
      value: 168,
    },
  ];

  return options;
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
