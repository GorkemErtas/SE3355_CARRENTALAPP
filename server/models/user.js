const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Email doğrulama
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum 8 karakter
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    photoUrl: {
      type: String, // Fotoğraf URL'si opsiyonel
    },
    createdAt: {
      type: Date,
      default: Date.now, // Kullanıcı kayıt tarihi
    },
  },
  { timestamps: true } // createdAt ve updatedAt otomatik olarak eklenir
);

module.exports = mongoose.model("User", UserSchema);
