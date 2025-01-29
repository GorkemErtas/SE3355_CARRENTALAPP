const express = require('express');
const Office = require('../models/office');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const offices = await Office.find();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/nearby', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  const RADIUS = 30 / 6378; 

  try {
    const offices = await Office.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], RADIUS],
        },
      },
    });
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/autocomplete', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const offices = await Office.find({
      name: { $regex: query, $options: 'i' },
    }).limit(10);

    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
