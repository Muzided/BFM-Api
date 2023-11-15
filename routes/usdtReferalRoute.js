const express = require("express");
const router = express.Router();
const { AddUsdtReferral, getTopUsdtReferrals} = require("./../controller/usdtReferralController")

router.route("/add-usdtReferral").post(AddUsdtReferral);
router.route("/get-top-usdtReferrals").get(getTopUsdtReferrals);
module.exports = router;    