const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51N9YB5A96uk6CWAV6a8YE3axlSMGGu8yvckyYiHXNzZdnzayrINT2uq1LMDCiAaokRm8GXSBQ7UOgQduV5TGx17W00SNzqqryG');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const {Transaction}=require('../models');
const bodyParser = require('body-parser');

const endpointSecret = 'whsec_UO3Wh3M0FUmb0e6MzXnwqwLWT8OCxeiz';

router.use(bodyParser.json());

router.post('/webhooks', async (req, res) => {
  const event = req.body;

  try {
    if (event.type === 'checkout.session.completed') {
      // Handle checkout session completed event
      const session = event.data.object;
      const cartId = 1;

      const transaction = {
        transactionDate: new Date(),
        paymentProcessor: 'Stripe',
        currency: session.currency,
        CartId: cartId,
        TransactionStatusId: 1,
      };

      await Transaction.create(transaction);
      console.log('Transaction created:', transaction);
    
      // Perform any necessary actions, such as updating your cart or sending confirmation emails
      console.log('Checkout session completed:', session);
    } else if (event.type === 'payment_intent.succeeded') {
      // Handle payment intent succeeded event
      const paymentIntent = event.data.object;
      // Perform any necessary actions
      console.log('Payment intent succeeded:', paymentIntent);
    } else {
      console.log('Unhandled event type:', event.type);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling webhook event:', error);
    res.sendStatus(500);
  }
});

module.exports = router;