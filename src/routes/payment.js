const {Router} = require('express');
const route = Router();
const stripe = require('stripe')('sk_test_51H0ZwIFc56vPOQm2k2sqRyIsFxZaVSfBZJ9c2ltkBZu4LkgAuYMplHX6sF69ntrwtDwkS5LBCF1ZZJuQEL4phzYu00zaGvJNxD');

route.post('/', async (req, res)=>{
    console.log(req.body)
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    const change = await stripe.changes.create({
        amount: '500',
        currency: 'mxn',
        customer: customer.id,
        description: 'shop'
    })
    console.log(change.id)
    res.json('Success')
})
module.exports = route;