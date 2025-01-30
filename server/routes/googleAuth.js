const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

const router = express.Router();
const client = new OAuth2Client("");

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "",
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
