const mongoose = require('mongoose');
const Car = require('../models/car');
const Office = require('../models/office');
require('dotenv').config();

const seedCars = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');

    
    const office = await Office.findOne();
    if (!office) {
      console.log('No office found. Please create an office first.');
      return;
    }

    
    const cars = [
      {
        model: 'Renault Clio',
        fuelType: 'Diesel',
        transmission: 'Manual',
        dailyPrice: 1914.18,
        deposit: 2500,
        mileage: 1000,
        minAge: 20,
        office: office._id,
        imageUrl: 'http://localhost:5000/public/images/clio.jpeg',
      },
      {
        model: 'Fiat Egea',
        fuelType: 'Petrol',
        transmission: 'Manual',
        dailyPrice: 1963.07,
        deposit: 3000,
        mileage: 690,
        minAge: 14,
        office: office._id,
        imageUrl: 'http://localhost:5000/public/images/egea.jpeg',
      },
      {
        model: 'Renault Clio AT',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        dailyPrice: 2179.64,
        deposit: 2000,
        mileage: 670,
        minAge: 5,
        office: office._id,
        imageUrl: 'http://localhost:5000/public/images/clioat.jpeg',
      },
      {
        model: 'BMW M4',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        dailyPrice: 45000.64,
        deposit: 10000,
        mileage: 560,
        minAge: 2,
        office: '67969a347a7c3aebc4006a9b',
        imageUrl: 'http://localhost:5000/public/images/m4.jpeg',
      },
    ];

   
    await Car.insertMany(cars);

    console.log('Cars seeded successfully');
    process.exit(); 
  } catch (error) {
    console.error('Error seeding cars:', error);
    process.exit(1); 
  }
};

seedCars();