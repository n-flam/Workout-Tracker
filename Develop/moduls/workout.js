const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day:{
        type: Date,
        default: () => new Date(),
    },
    exercises:[
        {
            type: {
                type: String,
                trim: true,
                required: "please enter an excersie type",
            },
            name: {
                type: String,
                trim: true,
                required: "please enter name",
            },
            duration: {
                type: Number,
                requierd: "enter how long the exercies took",
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        },
    ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;