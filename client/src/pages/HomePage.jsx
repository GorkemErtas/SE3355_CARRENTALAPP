import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const HomePage = () => {
  const [offices, setOffices] = useState([]);
  const [pickupOffice, setPickupOffice] = useState("");
  const [returnOffice, setReturnOffice] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const [coordinates, setCoordinates] = useState({ lat: 39.92077, lng: 32.85411 });
  const [userCity, setUserCity] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "EN" ? "TR" : "EN"));
  };

  const translations = {
    EN: {
      title: "Car Rental",
      login: "Login",
      pickupOffice: "Pickup Office",
      returnOffice: "Return Office",
      date: "Date",
      time: "Time",
      rent: "Rent",
      selectOffice: "Select a Pickup Office",
      alert: "Please fill out all fields!",
      logout: "Log Out",
    },
    TR: {
      title: "Araç Kiralama",
      login: "Giriş",
      pickupOffice: "Alış Ofisi",
      returnOffice: "İade Ofisi",
      date: "Tarih",
      time: "Saat",
      rent: "Kirala",
      selectOffice: "Bir Alış Ofisi Seçin",
      alert: "Lütfen tüm alanları doldurun!",
      logout: "Çıkış Yap",
    },
  };

  useEffect(() => {
    
    const fetchUserInfo = async () => {
      try {
       
        const email = localStorage.getItem("userEmail"); 
        if (!email) return;

        const response = await axios.get("http://localhost:5000/api/user/profile", {
          params: { email },
        });

        setUserName(response.data.firstName);
        setUserCity(response.data.city);
        setIsLoggedIn(true); 
        const geoResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: response.data.city,
            key: "AIzaSyDjSXEF1dPzfEcHvcTxKxYN14Easaxk9j0",
          },
        });
        if (geoResponse.data.results.length > 0) {
          const location = geoResponse.data.results[0].geometry.location;
          setCoordinates({ lat: location.lat, lng: location.lng });
        } else {
          console.warn("Şehir için koordinatlar bulunamadı.");
        }
      } catch (error) {
        console.error("Kullanıcı bilgisi alınırken hata:", error);
      }
    };
    

    fetchUserInfo();
  }, []);

  useEffect(() => {
    
    const fetchOffices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/offices");
        setOffices(response.data); 
      } catch (error) {
        console.error("Ofis bilgileri alınırken hata:", error);
      }
    };

    fetchOffices();
  }, []);

  const handleRent = () => {
    if (!pickupOffice || !returnOffice || !pickupDate || !pickupTime || !returnDate || !returnTime) {
      alert(translations[language].alert);
      return;
    }
    
    navigate(`/search-results?officeId=${pickupOffice}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    localStorage.removeItem("userName");
    localStorage.removeItem("userCity");
    setIsLoggedIn(false);
    alert("Çıkış yapıldı!");
  };

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">{translations[language].title}</h1>
        {isLoggedIn && <p>Merhaba, {userName}</p>}
        <div className="button-group">
        <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="language-button" onClick={toggleLanguage}>
            {language}
          </button>
          <button onClick={handleLogout}>{translations[language].logout}</button>
        </div>
      </header>
      {/* Pickup Office Section */}
      <div className="form-section">
        <div>
          <label>{translations[language].pickupOffice}</label>
          <select
            value={pickupOffice}
            onChange={(e) => setPickupOffice(e.target.value)}
            className="dropdown"
          >
            <option value="">{translations[language].selectOffice}</option>
            {offices.map((office) => (
              <option key={office._id} value={office._id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>{translations[language].date}</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="input-date"
          />
        </div>
        <div>
          <label>{translations[language].time}</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="input-time"
          />
        </div>
      </div>

      {/* Return Office Section */}
      <div className="form-section">
        <div>
          <label>{translations[language].returnOffice}</label>
          <select
            value={returnOffice}
            onChange={(e) => setReturnOffice(e.target.value)}
            className="dropdown"
          >
            <option value="">Select a Return Office</option>
            {offices.map((office) => (
              <option key={office._id} value={office._id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>{translations[language].date}</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="input-date"
          />
        </div>
        <div>
          <label>{translations[language].time}</label>
          <input
            type="time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="input-time"
          />
        </div>
      </div>

      {/* Rent Button */}
      <div>
        <button className="button" onClick={handleRent}>{translations[language].rent}</button>
      </div>
      {/* Google Maps */}
      <LoadScript googleMapsApiKey="AIzaSyDjSXEF1dPzfEcHvcTxKxYN14Easaxk9j0">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinates} // Kullanıcının şehir bilgisine göre merkezlenir
          zoom={10}
        >
          {/* Ofislerin Haritada Gösterilmesi */}
          {offices.map((office) => (
            <Marker
              key={office._id}
              position={office.location} // Office'in konum bilgisi
              title={office.name} // Ofis adı
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default HomePage;
