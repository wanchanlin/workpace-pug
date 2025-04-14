const express = require("express");
const router = express.Router();

const positionController = require("./controller");

router.get("/", positionController.welcome);
router.get("/info", positionController.getAllPositions);
router.get("/addPosition", positionController.getAddForm);  
router.post("/addPosition", positionController.addPosition);


// Update these routes to match your form actions
router.get("/editPosition/:id", positionController.getEditForm);
router.post("/editPosition/:id", positionController.updatePosition);
router.post("/delete/:id", positionController.deletePosition);
router.get("/api", positionController.getPositionApi);



module.exports = router;
