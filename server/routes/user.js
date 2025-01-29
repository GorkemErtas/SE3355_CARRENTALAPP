const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/profile", async (req, res) => {
  try {
    
    const { email } = req.query; 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
    });
  } catch (error) {
    console.error("Kullanıcı bilgisi alınırken hata:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
