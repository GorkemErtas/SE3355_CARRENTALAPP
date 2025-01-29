import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const countryCityData = {
    Türkiye: ["İstanbul", "Ankara", "İzmir"],
    ABD: ["New York", "Los Angeles", "Chicago"],
    Almanya: ["Berlin", "Münih", "Frankfurt"],
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[^a-zA-Z0-9])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !city
    ) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    if (!isPasswordValid(password)) {
      alert(
        "Şifre geçerli değil! Şifre en az 8 karakter, bir sayı ve bir özel karakter içermelidir."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("country", country);
    formData.append("city", city);
    if (photo) formData.append("photo", photo);

    // Backend'e kayıt isteği gönder
    fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country,
          city,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Kayıt başarılı!");
            navigate("/login");
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || "Kayıt başarısız!");
            });
          }
        })
        .catch((error) => {
          console.error("Kayıt sırasında hata oluştu:", error);
          alert(error.message || "Kayıt sırasında bir hata oluştu.");
        });}

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="register-container">
      <h1>Kayıt Ol</h1>
      <div className="form-group">
        <label>Ad:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Soyad:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Kullanıcı Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Tekrar:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Ülke:</label>
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCity("");
          }}
          className="input"
        >
          <option value="">Ülke Seçiniz</option>
          {Object.keys(countryCityData).map((countryName) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Şehir:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
          disabled={!country}
        >
          <option value="">Şehir Seçiniz</option>
          {country &&
            countryCityData[country].map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fotoğraf (Opsiyonel):</label>
        <input type="file" onChange={handlePhotoChange} className="input" />
      </div>
      <button onClick={handleRegister} className="button">
        Kayıt OL
      </button>
      <button onClick={() => navigate("/login")} className="button secondary">
        Geri Dön
      </button>
    </div>
  );
};

export default RegisterPage;
