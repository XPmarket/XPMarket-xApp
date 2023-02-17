import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { SSRConfig } from 'next-i18next';

import { makeTranslations } from '@system/localization/i18n';
import { PageLayout } from '@templates/common/layout/page-layout/PageLayout';
import { Login } from '@templates/login/Login';

const LoginPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return (
    <PageLayout>
      <Login />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async (
  ctx
) => {
  const { translations } = await makeTranslations(ctx.locale, ['login']);

  return {
    props: translations,
  };
};

export default LoginPage;
