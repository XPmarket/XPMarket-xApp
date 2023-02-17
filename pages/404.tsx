import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { SSRConfig } from 'next-i18next';

import { makeTranslations } from '@system/localization/i18n';
import { PageLayout } from '@templates/common/layout/page-layout/PageLayout';
import { NotFound } from '@templates/not-found/NotFound';

const Page404: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <PageLayout>
      <NotFound />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<SSRConfig> = async (ctx) => {
  const { translations } = await makeTranslations(ctx.locale, ['404']);

  return {
    props: translations,
  };
};

export default Page404;
