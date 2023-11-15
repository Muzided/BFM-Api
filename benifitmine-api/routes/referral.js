const express = require("express");
const router = express.Router();
const { AddReferral, getTopReferrals} = require("./../controller/referral")

router.route("/add-referral").post(AddReferral);
router.route("/get-top-referrals").get(getTopReferrals);
module.exports = router;    