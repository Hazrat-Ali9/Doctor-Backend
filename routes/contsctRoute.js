const express = require("express");

const { contactFormSubmission } = require("../controllers/contactController");

const router = express.Router();

router.route("/query/submit").post(contactFormSubmission);

module.exports = router;