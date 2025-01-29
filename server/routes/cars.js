const express = require('express');
const Car = require('../models/car');

const router = express.Router();

// Belirli bir ofise ait araçları getir
router.get('/by-office/:officeId', async (req, res) => {
  const { officeId } = req.params;

  try {
    const cars = await Car.find({ office: officeId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error });
  }
});

module.exports = router;
