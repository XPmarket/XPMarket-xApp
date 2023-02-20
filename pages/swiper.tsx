import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { SSRConfig } from 'next-i18next';

import { makeTranslations } from '@system/localization/i18n';
import { PageLayout } from '@templates/common/layout/page-layout/PageLayout';
import { Nftinder } from '@templates/nftinder/Nftinder';

const SwiperPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return (
    <PageLayout>
      <Nftinder />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async (
  ctx
) => {
  const { translations } = await makeTranslations(ctx.locale, ['nftinder']);

  return {
    props: {
      ...translations,
    },
  };
};

export default SwiperPage;
