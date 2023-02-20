import { useCallback } from 'react';

import { XummDialog } from '@templates/common/xumm-dialog/XummDialog';
import { useModal } from '@xpmarket/xpm.system.use-modal';

import { NftOfferDialog } from './nft-offer-dialog/NftOfferDialog';
import { NftOfferDialogOptions, SubmitMutationDto } from './types';
import { useNftOfferCreateRequest } from './useNftOfferCreateRequest';

interface ReturnType {
  dialog: JSX.Element;
  openDialog: () => void;
}

export const useNftOfferDialog = (
  options: NftOfferDialogOptions
): ReturnType => {
  const {
    assetLogoSrc,
    assetName,
    collectionName,
    lastPriceValue,
    lastPriceCurrency,
    nftId,
    onXummSubmitSuccess,
    type,
  } = options;
  const {
    Modal: XummModal,
    isOpen: isXummModalOpen,
    showModal: showXummModal,
    hideModal: hideXummModal,
  } = useModal();
  const {
    Modal: NftModal,
    isOpen: isNftModalOpen,
    showModal: showNftModal,
    hideModal: hideNftModal,
  } = useModal();
  const { data, isError, isLoading, mutate } = useNftOfferCreateRequest(
    nftId,
    handleSubmitSuccess,
    type
  );

  const handleXummDialogSuccess = useCallback(() => {
    hideXummModal();
    onXummSubmitSuccess();
  }, [hideXummModal, onXummSubmitSuccess]);

  const handleSubmit = useCallback(
    (params: SubmitMutationDto) => {
      mutate(params);
    },
    [mutate]
  );

  return {
    dialog: (
      <>
        {isXummModalOpen && (
          <XummModal>
            <XummDialog
              isOpen={isXummModalOpen}
              onCancel={hideXummModal}
              isLoading={isLoading}
              isError={isError}
              withOptionalStep
              data={data?.data}
              onSuccess={handleXummDialogSuccess}
            />
          </XummModal>
        )}
        {isNftModalOpen && (
          <NftModal>
            <NftOfferDialog
              isOpen={isNftModalOpen}
              onCancel={hideNftModal}
              assetLogoSrc={assetLogoSrc}
              assetName={assetName}
              collectionName={collectionName}
              lastPriceValue={lastPriceValue}
              lastPriceCurrency={lastPriceCurrency}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              type={type}
            />
          </NftModal>
        )}
      </>
    ),
    openDialog: showNftModal,
  };

  function handleSubmitSuccess(): void {
    hideNftModal();
    showXummModal();
  }
};
