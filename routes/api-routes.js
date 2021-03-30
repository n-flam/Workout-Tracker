//  5 routes: x1 post, x1 put, x2 get, 1 delete
// const router expres
// requier model workout
const router = require("express").Router();
const Workout = require("../moduls/workout")

// 1 get route
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((workoutDBs) => {
      res.json(workoutDBs);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        err: String(err),
      });
    });
});

// 2nd get route
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
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
router.put("/api/workouts/:id", ({ body, params }, res) => {
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
router.post("/api/workouts", (req, res) => {
  Workout.create({})
  .then((workoutDB) => {
    res.json(workoutDB);
  })
  .catch((err) => {
    res.json(err);
  });
});

// 1 delet route
router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
module.exports = router;
