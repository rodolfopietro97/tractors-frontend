import { SubscriptionType } from '@/app/components/Sucscription/types.d';

function SubscriptionHandler({
  subscription,
}: {
  subscription: SubscriptionType;
}): JSX.Element {
  return (
    <div className='flex flex-col text-center'>
      <div>
        <h1 className='my-5 text-lg'>Your subscription</h1>
      </div>
      <div className='flex flex-row justify-center justify-items-start text-center'>
        <b>Inizio:</b>
        <p>
          {new Date(subscription.current_period_start).toLocaleDateString()}
        </p>
      </div>
      <div className='flex flex-row justify-center justify-items-start text-center'>
        <b>Scadenza:</b>
        <p>{new Date(subscription.current_period_end).toLocaleDateString()}</p>
      </div>
      <div className='flex flex-row justify-center justify-items-start text-center'>
        <b>Status:</b>
        <p>{subscription.status}</p>
      </div>
    </div>
  );
}

export { SubscriptionHandler };
