const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  AddTask,
  GetTask,
  UpdateTask,
  DeleteTask,
} = require("../controllers/task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", GetTask);

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("status").notEmpty().withMessage("Column is required"),
  ],
  AddTask
);

router.put(
  "/:taskId",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  UpdateTask
);

router.delete("/:taskId", DeleteTask);

module.exports = router;
