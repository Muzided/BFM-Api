const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referralAddress: {
    type: String,
    required: true,
  },
  earnings: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
});

module.exports = mongoose.model('Referral', referralSchema);
