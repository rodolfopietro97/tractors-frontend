'use client';
import { ContentLoading } from '@/app/components/ContentLoading/ContentLoading';
import { RowColHelper } from '@/app/components/RowColHelper';
import { LinkButton } from '@/app/components/ui/Button';
import { AuthenticationContext } from '@/contexts';
import { useUserDetails } from '@/hooks';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Layout, LAYOUT_TYPE } from '@/app/components/Layouts';

import { Stripe } from '@stripe/stripe-js';
import getStripe from '@/utils/get-stripe';
import Script from 'next/script';

// If using TypeScript, add the following snippet to your file as well.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

/**
 * Dashboard page
 */
const Payment: NextPageWithLayout = () => {
  // Authentication context
  const { token } = useContext(AuthenticationContext);

  // User details
  const { data, error, isLoading } = useUserDetails(token as string);

  // Stripe instance
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const loadStripeInstance = async (): Promise<void> => {
      let tempStripe = await getStripe();
      setStripe(tempStripe);
    };
    loadStripeInstance();
  }, []);

  const PriceTable = ({ email }: { email: string }): JSX.Element => {
    return (
      <>
        {email}
        <stripe-pricing-table
          pricing-table-id='prctbl_1OX3gIKyz5Ny4kZHOX95JJIg'
          publishable-key='pk_test_51OX1FsKyz5Ny4kZHWds3666E5bGGznJ448rU3y34NeauIvozheEPkRsIj7Z9jyfseF4nNp5fJ4MafPR0eEOLMnfp00lmriBy5s'
          client-reference-id={email}
        ></stripe-pricing-table>
      </>
    );
  };

  return (
    <>
      <Script
        async
        strategy='beforeInteractive'
        src='https://js.stripe.com/v3/pricing-table.js'
      ></Script>
      <main>
        <div>
          {JSON.stringify(stripe)}
          {data?.email !== null && data?.email !== undefined && (
            <PriceTable email={data.email} />
          )}
          {/*<ContentLoading isLoading={isLoading || data?.code == "token_not_valid"} error={error}>*/}
          {/*    <>*/}
          {/*{data?.email && <>*/}
          {/*<stripe-pricing-table pricing-table-id="prctbl_1OX27zKyz5Ny4kZH0dpaMK8L"*/}
          {/*                      publishable-key="pk_test_51OX1FsKyz5Ny4kZHWds3666E5bGGznJ448rU3y34NeauIvozheEPkRsIj7Z9jyfseF4nNp5fJ4MafPR0eEOLMnfp00lmriBy5s">*/}
          {/*</stripe-pricing-table>*/}
          {/*</>}*/}
          {/*</>*/}
          {/*</ContentLoading>*/}
        </div>
      </main>
    </>
  );
};

/**
 * Custom layout
 *
 * @param page - Page to wrap
 */
Payment.getLayout = function getLayout(page: ReactElement) {
  return <Layout layoutType={LAYOUT_TYPE.PAGE}>{page}</Layout>;
};

export default Payment;
