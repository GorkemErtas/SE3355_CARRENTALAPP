const mongoose = require('mongoose');
const Office = require('../models/office');
require('dotenv').config();

const seedOffices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');

    const offices = [
      { name: 'Capital Rent', location: { lat: 39.92077, lng: 32.85411 }, city: 'Ankara', address: 'Kızılay, Çankaya' },
      { name: 'Kardeşler Car', location: { lat: 41.0082, lng: 28.9784 }, city: 'İstanbul', address: 'Taksim, Beyoğlu' },
    ];

    await Office.insertMany(offices);

    console.log('Offices seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding offices:', error);
    process.exit(1);
  }
};

seedOffices();
