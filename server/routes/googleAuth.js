const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

const router = express.Router();
const client = new OAuth2Client("208971797877-o73qp8c019cfp0pudlt5rsvf33d486bg.apps.googleusercontent.com");

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "208971797877-o73qp8c019cfp0pudlt5rsvf33d486bg.apps.googleusercontent.com",
    });

    const { email, name } = ticket.getPayload();

    // Kullanıcıyı kontrol et veya oluştur
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, firstName: name, password: "" });
      await user.save();
    }

    res.status(200).json({ message: "Giriş başarılı!", user });
  } catch (error) {
    console.error("Google giriş hatası:", error);
    res.status(401).json({ message: "Giriş başarısız!" });
  }
});

module.exports = router;
