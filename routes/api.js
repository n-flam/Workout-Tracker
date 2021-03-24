//  5 routes: x1 post, x1 put, x2 get, 1 delete

// const router expres
const router = require('express').Router();
// requier model workout
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

// 1 put route
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

//   1 post route
router.post('/api/workouts', (req, res) => {
  Workout.create({})
  .then((workoutDB) => {
    res.json(workoutDB);
  })
  .catch((err) => {
    res.json(err);
  });
});

// 1 delet route
router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
module.exports = router;
