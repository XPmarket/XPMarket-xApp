import { FC } from 'react';

import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import { NftSwipeHistoryItem } from '@xpmarket/xpm.api.xpmarket';
import {
  BASE_DOMAINS,
  replaceRouteParams,
  XPMARKET_ROUTES,
} from '@xpmarket/xpm.system.routes';
import { LINK_OVERFLOW } from '@xpmarket/xpm.system.theme';
import { Card } from '@xpmarket/xpm.ui.cards.card';
import { AssetAvatar } from '@xpmarket/xpm.ui.gallery.asset-avatar';
import { TextLink } from '@ui/buttons/TextLink';

import { BuyNowButton } from './BuyNowButton';
import { ListItemCollection } from './ListItemCollection';
import { MakeOfferButton } from './MakeOfferButton';

interface Props {
  nft: NftSwipeHistoryItem;
}

export const NftinderHistoryListItem: FC<Props> = (props) => {
  const { nft } = props;

  return (
    <Card
      sx={{
        p: (theme) => theme.spacing(0.8, 1.5),
        flexShrink: 0,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <AssetAvatar
          src={nft.image}
          fallbackText={nft.name}
          variant="rounded"
          sx={{
            width: 48,
            height: 48,
          }}
        />
        <Stack overflow="hidden">
          <TextLink
            href={
              BASE_DOMAINS.xpmarket +
              replaceRouteParams(XPMARKET_ROUTES.nftItem.path, {
                id: nft.id,
              })
            }
            fontWeight="fontWeightBold"
            fontSize={14}
            target="_blank"
            rel="nofollow noopener noreferrer"
            sx={LINK_OVERFLOW}
          >
            {nft.name}
          </TextLink>
          <ListItemCollection
            nftCollection={nft.collection}
            nftCollectionId={nft.collectionId}
          />
        </Stack>
        <Stack
          direction="row"
          flexGrow={1}
          justifyContent="flex-end"
          spacing={1}
        >
          <Box width="120px">
            {nft.salePrice ? (
              <BuyNowButton nftId={nft.id} />
            ) : (
              <MakeOfferButton
                assetLogoSrc={nft.image}
                assetName={nft.name}
                collectionName={nft.collection ?? undefined}
                lastPriceValue={nft.price.value}
                lastPriceCurrency={nft.price.currency}
                nftId={nft.id}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};
