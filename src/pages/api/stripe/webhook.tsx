import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

const secret_key =
  'sk_test_51OX1FsKyz5Ny4kZHcub5xbLBo0DA6Vu55x8FAByvkIcIqCcJFWeIzmcXFPfLQJqsslF2RthnceN1u70GdizEBkDr00fvGu8Qdc';

const stripe = new Stripe(secret_key, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Received Stripe webhook');

  if (req.method === 'POST') {
    console.log('Processing POST request for Stripe webhook');

    const reqBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        reqBuffer.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Log the event type and metadata
    console.log(`Received Stripe event: ${event.type}`);

    if (event.data && event.data.object) {
      console.log('Event data:', event.data.object);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
