
const mongoose = require("mongoose");

const reservationSchema= new mongoose.Schema({
    user:{
      type:  mongoose.Schema.Types.ObjectId,ref: 'User', required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
},{
    timeestamps:true,
}
);

const Reservation= mongoose.model('Reservation', reservationSchema);
module.exports=Reservation;