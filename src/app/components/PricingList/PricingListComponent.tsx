import {
  PricePlanType,
  ProductFuturePlanType,
} from '@/app/components/PricingList/types.d';
import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts';
import getStripe from '@/utils/get-stripe';
import { Stripe } from '@stripe/stripe-js';
import { getCheckoutSessionFetcher } from '@/fetchers';
import {
  Button,
  CardHeader,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/card';
import { useRouter } from 'next/router';

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
  const { token } = useContext(AuthenticationContext);

  // Router
  const router = useRouter();

  // Subscription button.
  const SubscriptionButton = (
    <>
      {token !== null ? (
        <Button
          colorScheme='yellow'
          onClick={async () => {
            // 1 - Get checkout session id
            const request = await getCheckoutSessionFetcher(price.id, token);
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
      ) : (
        <Button colorScheme='yellow' onClick={() => router.push('/register')}>
          Iscriviti ora!
        </Button>
      )}
    </>
  );

  return (
    <Card>
      <CardHeader>
        <Container centerContent>
          <Heading size='md'>{planTitle}</Heading>
        </Container>
      </CardHeader>
      <CardBody>
        <Container mb={10} centerContent>
          <Text>{description}</Text>
        </Container>
        <Divider />
        <Container centerContent mt={5} mb={5}>
          <span className='mr-2 text-5xl font-extrabold'>
            &euro;{price.price}
            <sub className='ml-3 text-xs'>/mese</sub>
          </span>
        </Container>
        <Divider />
      </CardBody>
      <CardFooter>
        <Container centerContent>{SubscriptionButton}</Container>
      </CardFooter>
    </Card>
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
    <SimpleGrid spacing={12} columns={{ base: 1, md: 1, lg: 2 }}>
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
    </SimpleGrid>
  );
}

export { PricingListComponent };
