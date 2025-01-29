import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // Stil dosyası, isterseniz ek düzenleme yapılabilir
import App from "./App";

// React 18 ile root oluşturulması
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
