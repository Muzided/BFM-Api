const mongoose = require('mongoose');

const usdtReferralSchema = new mongoose.Schema({
  referralAddressUsdt: {
    type: String,
    required: true,
  },
  earningsUsdt: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
});

module.exports = mongoose.model('UsdtReferral', usdtReferralSchema);
