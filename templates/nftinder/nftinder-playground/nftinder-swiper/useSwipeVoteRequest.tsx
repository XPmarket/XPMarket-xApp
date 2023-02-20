import { TFunction, useTranslation } from 'next-i18next';

import { api } from '@api/endpoints';
import { formatError } from '@system/fetch/errors';
import { useApiMutation } from '@system/fetch/useApiMutation';
import { PostNftSwipeVoteRo } from '@xpmarket/xpm.api.xpmarket';

import { VoteMutationVariables } from './types';

interface ReturnType {
  isLoading: boolean;
  voteMutation: (variables: VoteMutationVariables) => void;
}

export const useSwipeVoteRequest = (): ReturnType => {
  const { t } = useTranslation();
  const { isLoading, mutate } = useApiMutation(
    (variables: VoteMutationVariables) => request(variables, t)
  );

  return {
    isLoading,
    voteMutation: mutate,
  };
};

const request = async (
  variables: VoteMutationVariables,
  t: TFunction
): Promise<PostNftSwipeVoteRo> => {
  try {
    const { nftId, direction } = variables;
    const res = await api.xpmarket.nft.postNftSwipeVote({
      nftId,
      decision: direction === 'left' ? 0 : 1,
    });

    return res;
  } catch (error) {
    throw formatError({
      error,
      message: t('nftinder:errors.swipeVoteFail'),
      showToast: true,
    });
  }
};
