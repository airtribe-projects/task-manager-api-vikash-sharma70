const getNextId = (tasks) => {
  if (tasks.length === 0) return 1

  const maxId = Math.max(...tasks.map(task => task.id))
  return maxId + 1
}

module.exports = {
  getNextId
}