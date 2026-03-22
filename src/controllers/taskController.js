const { readTasks, writeTasks } = require("../utils/fileHandler")
const { validateTaskInput } = require("../utils/validation")
const { getNextId } = require("../utils/idGenerator")

exports.getAllTasks = (req, res) => {
  try {
    let data = readTasks()
    let tasks = data.tasks

    if (req.query.completed !== undefined) {
      const completed = req.query.completed === "true"
      tasks = tasks.filter(t => t.completed === completed)
    }

    if (req.query.sort === "asc") {
      tasks = tasks.sort((a, b) => a.id - b.id)
    } else if (req.query.sort === "desc") {
      tasks = tasks.sort((a, b) => b.id - a.id)
    }

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.getTaskById = (req, res) => {
  try {
    const data = readTasks()

    const task = data.tasks.find(t => t.id == req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.getTasksByPriority = (req, res) => {
  try {
    const { level } = req.params

    const validPriorities = ["low", "medium", "high"]

    if (!validPriorities.includes(level)) {
      return res.status(400).json({ message: "Invalid priority level" })
    }

    const data = readTasks()

    const tasks = data.tasks.filter(t => t.priority === level)

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.createTask = (req, res) => {
  try {
    const error = validateTaskInput(req.body)

    if (error) {
      return res.status(400).json({ message: error })
    }

    const data = readTasks()

    const newTask = {
      id: getNextId(data.tasks),
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      completed: req.body.completed ?? false,
      priority: req.body.priority ?? "low"
    }

    data.tasks.push(newTask)

    writeTasks(data)

    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.updateTask = (req, res) => {
  try {
    const data = readTasks()

    const task = data.tasks.find(t => t.id == req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    const error = validateTaskInput(req.body, true)

    if (error) {
      return res.status(400).json({ message: error })
    }

    const { title, description, completed, priority } = req.body

    if (title !== undefined) task.title = title.trim()
    if (description !== undefined) task.description = description.trim()
    if (completed !== undefined) task.completed = completed
    if (priority !== undefined) task.priority = priority 

    writeTasks(data)

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.deleteTask = (req, res) => {
  try {
    const data = readTasks()

    const filteredTasks = data.tasks.filter(t => t.id != req.params.id)

    if (filteredTasks.length === data.tasks.length) {
      return res.status(404).json({ message: "Task not found" })
    }

    data.tasks = filteredTasks

    writeTasks(data)

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}