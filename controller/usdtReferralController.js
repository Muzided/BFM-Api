

const usdtReferral = require("../modles/usdtReferral");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

// Function to add referral
const AddUsdtReferral = asyncHandler(async (req, res) => {
    const {  referralAddressUsdt,amount } = req.body;
    console.log(referralAddressUsdt,amount)
    let referral = await usdtReferral.findOne({ referralAddressUsdt });
    

    if (referral) {
      // If it exists, update the earnings by adding the new amount
      console.log(referral)
      referral.earningsUsdt += amount;
      await referral.save();
    } else {
      // If it doesn't exist, create a new referral with the given address and amount
      referral = new usdtReferral({ referralAddressUsdt, earningsUsdt: amount });
      await referral.save();
    }

    res.status(201).json({ message: 'Usdt Referral saved successfully' });

});


const getTopUsdtReferrals = asyncHandler(async (req, res) => {

    const topReferrals = await usdtReferral.aggregate([
        {
          $group: {
            _id: '$referralAddressUsdt',
            totalUsdtEarnings: { $sum: '$earningsUsdt' }, // Sum the earnings for each referralAddress
          },
        },
        {
          $sort: { totalUsdtEarnings: -1 }, // Sort by totalEarnings in descending order
        },
        {
          $limit: 3, // Limit the results to the top 3
        },
      ]);
    
      res.status(200).json(topReferrals);

})



module.exports = { AddUsdtReferral, getTopUsdtReferrals };