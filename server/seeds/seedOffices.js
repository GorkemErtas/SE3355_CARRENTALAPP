const mongoose = require('mongoose');
const Office = require('../models/office');
require('dotenv').config();

const seedOffices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');

    const offices = [
      { name: 'Capital Rent', location: { lat: 39.940534, lng: 32.899220 }, city: 'Ankara', address: 'Bahçelerüstü' },
      { name: 'Kardeşler Car', location: { lat: 41.019399, lng: 28.926821 }, city: 'İstanbul', address: 'Topkapı' },
      { name: 'NY Car', location: { lat: 40.663389, lng: -74.210568 }, city: 'New York', address: 'Elizabeth' },
      { name: 'Das Auto', location: { lat: 52.675385, lng: 13.591942 }, city: 'Berlin', address: 'Bernau bei Berlin' },
      { name: 'AliBey Oto', location: { lat: 40.995185, lng: 29.029406 }, city: 'İstanbul', address: 'Kadıköy' },
      { name: 'Merkez Oto', location: { lat: 39.971703, lng: 32.586969 }, city: 'Ankara', address: 'Sincan' }
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
