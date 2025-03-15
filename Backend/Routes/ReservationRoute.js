const express = require("express");
const{ cancelReservation,
createReservation,
getUserReservation} = require("../controller/ReservController");
const { checkAuth } = require("../middleware/Check_Authmiddleware");


const router = express.Router();

// User must be logged in (JWT required)
router.post('/create', checkAuth ,createReservation);
router.get('/mybookings', checkAuth, getUserReservation);
router.delete('/cancel/:bookingId', checkAuth, cancelReservation);

module.exports=router;