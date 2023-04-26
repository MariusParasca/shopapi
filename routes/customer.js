const { Router } = require('express');
const Customer = require('../models/Customer.js');
const { customerBodyValidation } = require('../utils/validationSchema.js');
const { mapCustomer } = require('../mappers/customer.js');
const auth = require('../middleware/auth.js');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.find({});
    res.send(customers.map(mapCustomer));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) res.status(404).send(null);
    else res.send(mapCustomer(customer));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = customerBodyValidation(req.body);
    if (error) return res.status(400).json({ error: true, message: error.details[0].message });

    const customer = await Customer.findOne({ email: req.body.email });
    if (customer) return res.status(400).json({ error: true, message: 'Customer with given email already exist' });

    const customerCreated = await Customer.create(req.body);
    res.send(mapCustomer(customerCreated));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = customerBodyValidation(req.body);
    if (error) return res.status(400).json({ error: true, message: error.details[0].message });

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) res.status(404).send(null);
    else res.send(mapCustomer(customer));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(mapCustomer(customer));
    next();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
