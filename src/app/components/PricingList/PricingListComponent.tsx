import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, LinkButton } from '../ui/Button';
import {
  PricePlanType,
  ProductFuturePlanType,
} from '@/app/components/PricingList/types.d';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '@/contexts';
import getStripe from '@/utils/get-stripe';
import { Stripe } from '@stripe/stripe-js';
import { getCheckoutSessionFetcher } from '@/fetchers';

/**
 * Component for price future of a plan
 */
function PlanFutureComponent({ text }: { text: string }): JSX.Element {
  return (
    <li className='flex items-center space-x-3'>
      <FontAwesomeIcon icon={faCheck} className='h-5 w-5 text-green-500' />
      <span>{text}</span>
    </li>
  );
}

function CheckoutButton({
  priceId,
  token,
}: {
  priceId: string;
  token: string;
}): JSX.Element {
  return (
    <Button
      onClick={async () => {
        // 1 - Get checkout session id
        const request = await getCheckoutSessionFetcher(priceId, token);
        const data = await request.json();

        // 2 - Redirect to stripe checkout
        const stripe = (await getStripe()) as Stripe;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.session_id,
        });
        console.warn(error.message);
      }}
    >
      Get started
    </Button>
  );
}

/**
 * Single price plan component
 */
function PricingPlanComponent({
  planTitle,
  description,
  price,
}: {
  planTitle: string;
  description: string;
  price: PricePlanType;
}): JSX.Element {
  // Authentication context
  const { token, isJWTValid } = useContext(AuthenticationContext);

  return (
    <div className='mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow xl:p-8'>
      <h3 className='mb-4 text-2xl font-semibold'>{planTitle}</h3>
      <p className='font-light text-gray-500 sm:text-lg'>{description}</p>
      <div className='my-8 flex items-baseline justify-center'>
        <span className='mr-2 text-5xl font-extrabold'>
          &euro;{price.price}
        </span>
      </div>
      {token !== null && isJWTValid ? (
        <CheckoutButton priceId={price.id} token={token}></CheckoutButton>
      ) : (
        <LinkButton href='/register'>Get started</LinkButton>
      )}
    </div>
  );
}

/**
 * PricingList component
 */
function PricingListComponent({
  productFutures,
}: {
  productFutures: ProductFuturePlanType[];
}): JSX.Element {
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto mb-8 max-w-screen-md text-center lg:mb-12'>
          <h2 className='mb-4 text-4xl font-extrabold tracking-tight text-gray-900'>
            I nostri prezzi
          </h2>
        </div>

        {/*Futures*/}
        <div className='space-y-8 sm:gap-6 lg:grid lg:grid-cols-2 lg:space-y-0 xl:gap-10'>
          {productFutures.map((productFuture, index) => {
            return (
              <PricingPlanComponent
                key={index}
                planTitle={productFuture.name}
                description={productFuture.description}
                price={productFuture.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { PricingListComponent };
