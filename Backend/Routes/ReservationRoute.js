const express = require("express");
const{ cancelReservation,
createReservation,
getUserReservation} = require("../controller/ReservController");
const { checkAuth, checkAuthAdmin } = require("../middleware/Check_Authmiddleware");


const router = express.Router();

// User must be logged in (JWT required)
router.post('/create', checkAuthAdmin ,createReservation);
router.get('/mybookings', checkAuth, getUserReservation);
router.delete('/cancel/:id',  cancelReservation);

module.exports=router;