import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/SearchResults.css";

const SearchResults = () => {
    const [cars, setCars] = useState([]); // Tüm araçlar
    const [filteredCars, setFilteredCars] = useState([]); // Filtrelenmiş araçlar
    const [make, setMake] = useState("Tüm Araçlar");
    const [order, setOrder] = useState("En Düşük Fiyat");
    const [transmission, setTransmission] = useState("Tümü");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const officeId = queryParams.get("officeId");

  useEffect(() => {
    if (officeId) {
        axios
          .get(`http://localhost:5000/api/cars/by-office/${officeId}`)
          .then((response) => {
            setCars(response.data);
            setFilteredCars(response.data);
          })
          .catch((error) => console.error("Error fetching cars:", error));
      }
  }, [officeId]);

  useEffect(() => {
    let filtered = [...cars];

    // Marka Filtresi
    if (make !== "Tüm Araçlar") {
      filtered = filtered.filter((car) => car.model === make);
    }

    // Şanzıman Türü Filtresi
    if (transmission !== "Tümü") {
      filtered = filtered.filter((car) => car.transmission === transmission);
    }

    // Fiyat Sıralama
    if (order === "En Düşük Fiyat") {
      filtered.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (order === "En Yüksek Fiyat") {
      filtered.sort((a, b) => b.dailyPrice - a.dailyPrice);
    }

    setFilteredCars(filtered);
  }, [make, order, transmission, cars]);

  return (
    <div className="container">
      <h1>Search Results</h1>

      {/* Filtreleme Header */}
      <div className="filter-header">
        <div>
          <label>Araç Tipi:</label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="filter-dropdown"
          >
            <option value="Tüm Araçlar">Tüm Araçlar</option>
            {[...new Set(cars.map((car) => car.model))].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="filter-dropdown"
          >
            <option value="En Düşük Fiyat">En Düşük Fiyat</option>
            <option value="En Yüksek Fiyat">En Yüksek Fiyat</option>
          </select>
        </div>

        <div>
          <label>Şanzıman Tipi:</label>
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="filter-dropdown"
          >
            <option value="Tümü">Tümü</option>
            <option value="Manual">Manuel</option>
            <option value="Automatic">Otomatik</option>
          </select>
        </div>
      </div>

      {/* Araç Listesi */}
      <div className="car-list">
        {filteredCars.length === 0 ? (
          <p>Filtrelerinize uygun araç bulunamadı.</p>
        ) : (
          filteredCars.map((car) => (
            <div key={car._id} className="car-card">
              <img src={car.imageUrl} alt={car.model} className="car-image" />
              <h2>{car.model}</h2>
              <p>Yakıt Türü: {car.fuelType}</p>
              <p>Şanzıman: {car.transmission}</p>
              <p>Günlük Fiyat: {car.dailyPrice} TL</p>
              <p>Depozito: {car.deposit} TL</p>
              <p>Kilometre Limiti: {car.mileage} km</p>
              <p>Minimum Yaş: {car.minAge}+</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
