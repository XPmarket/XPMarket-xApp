import { addDays, addMonths } from 'date-fns';
import { useTranslation } from 'next-i18next';

import { api } from '@api/endpoints';
import { formatError } from '@system/fetch/errors';
import { useApiMutation } from '@system/fetch/useApiMutation';
import {
  OfferCreateType,
  PostOfferCreateDto,
  PostOfferCreateRo,
  PostOfferCreateRouteParams,
} from '@xpmarket/xpm.api.xpmarket';
import { formatDateUtc } from '@xpmarket/xpm.system.time';

import { SubmitMutation, SubmitMutationDto } from './types';

interface ReturnType {
  data: PostOfferCreateRo | undefined;
  isError: boolean;
  isLoading: boolean;
  mutate: SubmitMutation;
}

export const useNftOfferCreateRequest = (
  nftId: string,
  onSuccess: () => void,
  type: OfferCreateType
): ReturnType => {
  const { mutate, data, isLoading, isError } = useApiMutation(
    (variables: SubmitMutationDto) => request(variables, type),
    {
      onSuccess,
    }
  );
  const { t } = useTranslation();

  return {
    data,
    isError,
    isLoading,
    mutate,
  };

  async function request(
    {
      amount,
      currency,
      currencyIssuer,
      date,
      duration,
      offerHash,
    }: SubmitMutationDto,
    type: OfferCreateType
  ): Promise<PostOfferCreateRo> {
    try {
      const dto: PostOfferCreateDto = {
        currency,
        currencyIssuer,
        expiration: getExpirationDate(date, duration),
        price: amount,
        offerHash,
        type,
      };
      const routeParams: PostOfferCreateRouteParams = {
        id: nftId,
      };
      const res = await api.xpmarket.nft.postOfferCreate(dto, routeParams);

      return res;
    } catch (err) {
      throw formatError({
        error: err,
        message: t('common:errors.nftOfferCreateFail'),
        showToast: true,
      });
    }
  }
};

const getExpirationDate = (
  date: Date | undefined,
  duration: number | undefined
): string | undefined => {
  const utcDate = date ? formatDateUtc(date) : undefined;
  const durationDate = getDurationDate(duration);

  return utcDate ?? durationDate;
};

const getDurationDate = (duration: number | undefined): string | undefined => {
  if (duration) {
    const currDate = new Date();

    // Handle months duration
    if (duration % 28 === 0) {
      const noOfMonths = duration / 28;
      const date = addMonths(currDate, noOfMonths);

      return formatDateUtc(date);
    }
    // Otherwise handle days duration
    const date = addDays(currDate, duration);

    return formatDateUtc(date);
  }

  return undefined;
};
