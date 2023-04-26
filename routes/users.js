const { Router } = require('express');
const auth = require('../middleware/auth.js');
const roleCheck = require('../middleware/roleCheck.js');

const router = Router();

router.get('/details', auth, (req, res) => {
  res.status(200).json({ message: 'user authenticated.' });
});

module.exports = router;
