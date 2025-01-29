const express = require("express");
const User = require("../models/user");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, country, city, photoUrl } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email adresi zaten kayıtlı!" });
    }


    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      country,
      city,
      photoUrl,
    });

    await newUser.save();

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!" });
  } catch (error) {
    console.error("Kayıt sırasında hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
  }
});

module.exports = router;
