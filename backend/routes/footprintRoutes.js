const express = require("express");
const { saveFootprint, getHistory } = require("../controllers/footprintController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, saveFootprint);
router.get("/", auth, getHistory);

module.exports = router;
