const fs = require("fs")

const readTasks = () => {
  const data = fs.readFileSync("task.json", "utf-8")
  return JSON.parse(data)
}

const writeTasks = (data) => {
  fs.writeFileSync("task.json", JSON.stringify(data, null, 2))
}

module.exports = {
  readTasks,
  writeTasks
}