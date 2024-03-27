import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkButton } from '../ui/Button';

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

/**
 * Single price plan component
 */
function PricingPlanComponent({
  planTitle,
  description,
  price,
  futures,
  period,
  href,
}: {
  planTitle: string;
  description: string;
  price: number;
  futures: Array<string>;
  period: string;
  href: string;
}): JSX.Element {
  return (
    <div className='mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow xl:p-8'>
      <h3 className='mb-4 text-2xl font-semibold'>{planTitle}</h3>
      <p className='font-light text-gray-500 sm:text-lg'>{description}</p>
      <div className='my-8 flex items-baseline justify-center'>
        <span className='mr-2 text-5xl font-extrabold'>&euro;{price}</span>
        <span className='text-gray-500'>/{period}</span>
      </div>
      {/* Futures of Plan */}
      <ul role='list' className='mb-8 space-y-4 text-left'>
        {futures.map((future, index) => {
          return <PlanFutureComponent key={index} text={future} />;
        })}
      </ul>
      <LinkButton href={href}>Get started</LinkButton>
    </div>
  );
}

/**
 * PricingList component
 */
function PricingListComponent({
  monthlyPrice,
  annualPrice,
}: {
  monthlyPrice: number;
  annualPrice: number;
}): JSX.Element {
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        {/* Header */}
        <div className='mx-auto mb-8 max-w-screen-md text-center lg:mb-12'>
          <h2 className='mb-4 text-4xl font-extrabold tracking-tight text-gray-900'>
            I nostri prezzi
          </h2>
        </div>

        <div className='space-y-8 sm:gap-6 lg:grid lg:grid-cols-2 lg:space-y-0 xl:gap-10'>
          {/* Monthly price plan */}
          <PricingPlanComponent
            planTitle='Mensile'
            description='Opzione migliore se vuoi usare il servizio mese per mese.'
            price={monthlyPrice}
            period='mese'
            futures={[
              'Caratteristica 1 ...',
              'Caratteristica 2 ...',
              'Caratteristica 3 ...',
            ]}
            href='/register'
          />

          {/* Annual price plan */}
          <PricingPlanComponent
            planTitle='Annuale'
            description={`Opzione migliore se vuoi usare il servizio per un anno risparmiando così ${monthlyPrice * 12 - annualPrice} euro`}
            price={annualPrice}
            period='anno'
            futures={[
              'Caratteristica 1 ...',
              'Caratteristica 2 ...',
              'Caratteristica 3 ...',
            ]}
            href='/register'
          />
        </div>
      </div>
    </section>
  );
}

export { PricingListComponent };
