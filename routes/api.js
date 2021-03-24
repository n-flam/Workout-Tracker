//  5 routes: 1 post, 1 put, 2 get, 1 delete

// const router expres
const router = require('express').Router();
const Workout = require('../models/workout.js');

// 1 get get route
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then((workoutDBs) => {
      res.json(workoutDBs);
    })
    .catch((err) => {
      res.json(err);
    });
});

// requier model workout
