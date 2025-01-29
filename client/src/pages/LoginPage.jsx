import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Giriş başarısız.");
          });
        }
      })
      .then((data) => {
        
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userName", data.firstName);
        alert(`Hoş geldiniz, ${data.firstName}`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Giriş sırasında hata oluştu:", error);
        alert(error.message || "Giriş başarısız. Tekrar deneyin.");
      });
  };

  return (
    <div className="login-container">
      {/* Kullanıcı Giriş Formu */}
      <div className="form-group">
        <label>Kullanıcı Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Emailinizi girin"
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrenizi girin"
          className="input"
        />
      </div>

      {/* Giriş ve Üye Ol Butonları */}
      <div className="button-group">
        <button onClick={handleLogin} className="button">
          GİRİŞ
        </button>
        <button onClick={() => navigate("/register")} className="button secondary">
          ÜYE OL
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
