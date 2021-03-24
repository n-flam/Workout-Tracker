//  5 routes: 1 post, x1 put, x2 get, 1 delete

// const router expres
const router = require('express').Router();
const Workout = require('../models/workout.js');

// 1 get route
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

// 2nd get route
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((workoutDBs) => {
        console.log(workoutDBs);
        res.json(workoutDBs);
      })
      .catch((err) => {
        res.json(err);
      });
  });

// 1 put 
router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((workoutDB) => {
        res.json(workoutDB);
      })
      .catch((err) => {
        res.json(err);
      });
  });


// requier model workout
