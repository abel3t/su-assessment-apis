const router = require("express").Router();

// router.post(
//   "/:classroomId/students/:studentId/vote",
//   require("../handlers/histories/vote-student")
// );
router.post("/import", require("../handlers/classrooms/import-classrooms"));
router.get("/", require("../handlers/classrooms/get-all-classrooms"));
router.get("/:classroomId", require("../handlers/classrooms/get-classroom"));

router.post(
  "/:classroomId/students/import",
  require("../handlers/students/import-students")
);
router.get(
  "/:classroomId/students",
  require("../handlers/students/get-all-students-in-classroms")
);
router.get(
  "/:classroomId/students/:studentId",
  require("../handlers/students/get-student")
);

router.get("/", (req, res) => {
  res.send("Classroom");
});

module.exports = router;
