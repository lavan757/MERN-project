var express = require('express');
const { login, deleteEmployeeDetails, getEmployeeDetails, addEmployeeDetails } = require('../controller/user');
var router = express.Router();
const auth = require('../helper/jwt');

router.post('/login', login)
router.post('/getemployeedetails', auth.verifyToken, getEmployeeDetails)
router.post("/AddDetails", auth.verifyToken, addEmployeeDetails);
router.post("/deleteDetails", auth.verifyToken, deleteEmployeeDetails );

module.exports = router;