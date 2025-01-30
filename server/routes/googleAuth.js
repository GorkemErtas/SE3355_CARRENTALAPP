const express = require("express");
const User = require("../models/user"); // Kullanıcı modelini çekiyoruz.
const router = express.Router();

router.post("/google", async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Eğer kullanıcı kayıtlı değilse, yeni bir kullanıcı oluştur.
      user = new User({
        firstName,
        lastName,
        email,
        password: "", // Google ile giriş yapanların şifresi olmayacak.
        country: "Unknown",
        city: "Unknown",
        photoUrl: "",
      });

      await user.save();
    }

    // Kullanıcı bilgilerini geri döndür.
    res.status(200).json({
      firstName: user.firstName,
      email: user.email,
    });
  } catch (error) {
    console.error("Google ile giriş sırasında hata:", error);
    res.status(500).json({ message: "Google ile giriş başarısız." });
  }
});

module.exports = router;
