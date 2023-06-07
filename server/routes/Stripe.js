const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51N9YB5A96uk6CWAV6a8YE3axlSMGGu8yvckyYiHXNzZdnzayrINT2uq1LMDCiAaokRm8GXSBQ7UOgQduV5TGx17W00SNzqqryG');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');



router.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart, cartItems } = req.body;

    // Prepare the line items for the checkout session
    const lineItems = cartItems.map((cartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartItem.product.name,
           
          
          
        },
        unit_amount: cartItem.product.price * 100, // Convert price to the smallest currency unit (e.g., cents)
      },
      quantity: cartItem.amount,
      
      
    }));

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'RS'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 4,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 20,
              currency: 'usd',
            },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Failed to create checkout session');
  }
});

module.exports = router;