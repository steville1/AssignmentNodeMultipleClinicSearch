const express = require("express");
const router = express.Router();
const ClinicsController = require('../controllers/clinics');

const clinicsController = new ClinicsController();

//const {GetByDateRange} = require("../controllers/clinics");

router.get("/SearchByMultipleClinic/", clinicsController.validateClinics);
//router.param('userId', userById);

module.exports = router;