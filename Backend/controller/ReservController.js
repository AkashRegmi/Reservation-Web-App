const Reservation = require("../models/ReservationSchema"); // 

// Create a new reservation
const createReservation = async (req, res) => {
  try {
   
    const { date, time, guests } = req.body;
   
    const userId = req.authUser?.userId; 
      //Checking the User id 
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing. Please authenticate." });
      }

    const newReservation = new Reservation({
      user: userId,
      date,
      time,
      guests,
    });

    await newReservation.save();

    res.status(201).json({
      message: "Booking created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// Get reservations for a user
const getUserReservation = async (req, res) => {
  try {
    const userId = req.authUser?.userId; 
    const reservations = await Reservation.find({ user: userId });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// Cancel a reservation
// const cancelReservation = async (req, res) => {
//   try {
//     const { reservationId } = req.params;
//     const userId = req.authUser?.userId; 

//     const reservation = await Reservation.findOne({
//       _id: reservationId,
//       user: userId,
//     });

//     if (!reservation) return res.status(404).json({ message: "Booking not found" });

//     reservation.status = "cancelled";
//     await reservation.save();

//     res.status(200).json({ message: "Booking cancelled", reservation });
//   } catch (error) {
//     res.status(500).json({ message: "Error cancelling booking", error: error.message });
//   }
// };
const cancelReservation = async (req, res) => {
  try {
    const userId = req.authUser?.userId;
    const { reservationId } = req.params;

    // Checking if the user ID is available
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing. Please authenticate." });
    }

    // Finding the reservation and ensuring it belongs to the user
    const reservation = await Reservation.findOne({ _id: reservationId, user: userId });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found or unauthorized." });
    }

    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error: error.message });
  }
};


module.exports = {
  createReservation,
  getUserReservation,
  cancelReservation,
};
