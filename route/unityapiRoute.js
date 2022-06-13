const express = require("express");
const router = express.Router();
const Unity = require("../controller/UnityControl");

router.post("/start", Unity.StartSignal);
router.post("/scoreUpdate", Unity.ScoreUpadte);
router.post("/gameResult", Unity.GamResult);
router.get("/gethistory", Unity.getHistoryData);

module.exports = router;