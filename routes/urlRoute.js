const express = require("express");
const router = express.Router();
const { handleGenerateNewShortURL, handleUserAnalytics } = require("../controllers/urlController");

router.post("/", handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleUserAnalytics)

module.exports = router;
