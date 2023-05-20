const express=require('express')
const router=express.Router()
const stripe=require('stripe')('sk_test_51N9YB5A96uk6CWAV6a8YE3axlSMGGu8yvckyYiHXNzZdnzayrINT2uq1LMDCiAaokRm8GXSBQ7UOgQduV5TGx17W00SNzqqryG')

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
  
    res.redirect(303, session.url);
  });
  module.exports=router