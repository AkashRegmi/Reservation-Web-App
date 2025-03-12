const express = require("express");
const{ cancelReservation,
createReservation,
getUserReservation} = require("../controller/ReservController")


const router = express.Router();

// User must be logged in (JWT required)
router.post('/create',  createReservation);
router.get('/mybookings',  getUserReservation);
router.delete('/cancel/:bookingId',  cancelReservation);

module.exports=router;