const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email veya şifre hatalı!" });
    }

    
    if (user.password !== password) {
      return res.status(401).json({ message: "Email veya şifre hatalı!" });
    }

    // Başarılı giriş
    res.status(200).json({
        firstName: user.firstName,
        email: user.email,
        city: user.city,
      });
  } catch (error) {
    console.error("Giriş sırasında hata:", error);
    res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
  }
});

module.exports = router;
