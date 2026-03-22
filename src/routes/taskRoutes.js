const express = require("express")
const router = express.Router()

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority  
} = require("../controllers/taskController")

router.get("/tasks", getAllTasks)
router.get("/tasks/priority/:level", getTasksByPriority)
router.get("/tasks/:id", getTaskById)
router.post("/tasks", createTask)
router.put("/tasks/:id", updateTask)
router.delete("/tasks/:id", deleteTask)

module.exports = router