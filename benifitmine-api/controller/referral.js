

const Referral = require("../modles/referral");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

// Function to add referral
const AddReferral = asyncHandler(async (req, res) => {
    const {  referralAddress,amount } = req.body;
    let referral = await Referral.findOne({ referralAddress });
    

    if (referral) {
      // If it exists, update the earnings by adding the new amount
      referral.earnings += amount;
      await referral.save();
    } else {
      // If it doesn't exist, create a new referral with the given address and amount
      referral = new Referral({ referralAddress, earnings: amount });
      await referral.save();
    }

    res.status(201).json({ message: 'Referral saved successfully' });

});


const getTopReferrals = asyncHandler(async (req, res) => {

    const topReferrals = await Referral.aggregate([
        {
          $group: {
            _id: '$referralAddress',
            totalEarnings: { $sum: '$earnings' }, // Sum the earnings for each referralAddress
          },
        },
        {
          $sort: { totalEarnings: -1 }, // Sort by totalEarnings in descending order
        },
        {
          $limit: 3, // Limit the results to the top 3
        },
      ]);
    
      res.status(200).json(topReferrals);

})



module.exports = { AddReferral, getTopReferrals };