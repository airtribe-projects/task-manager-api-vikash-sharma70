const t = require("tap")
const request = require("supertest")
const app = require("../app")
const fs = require("fs")

const initialData = {
  tasks: []
}

const resetData = () => {
  fs.writeFileSync("task.json", JSON.stringify(initialData, null, 2))
}

t.beforeEach(() => {
  resetData()
})


t.test("POST /api/tasks - create valid task", async (t) => {
  const res = await request(app)
    .post("/api/tasks")
    .send({
      title: "Test Task",
      description: "Testing create",
      completed: true,
      priority: "high"
    })

  t.equal(res.status, 201)
  t.equal(res.body.title, "Test Task")
  t.equal(res.body.priority, "high")
})

t.test("POST /api/tasks - invalid input", async (t) => {
  const res = await request(app)
    .post("/api/tasks")
    .send({
      title: "",
      description: ""
    })

  t.equal(res.status, 400)
})

t.test("GET /api/tasks - get all tasks", async (t) => {
  await request(app).post("/api/tasks").send({
    title: "Task 1",
    description: "Test"
  })

  const res = await request(app).get("/api/tasks")

  t.equal(res.status, 200)
  t.type(res.body, Array)
})

t.test("GET /api/tasks?completed=true - filter tasks", async (t) => {
  await request(app).post("/api/tasks").send({
    title: "Task 1",
    description: "Test",
    completed: true
  })

  const res = await request(app).get("/api/tasks?completed=true")

  t.equal(res.status, 200)
  t.ok(res.body.every(task => task.completed === true))
})

t.test("GET /api/tasks?sort=asc - sort tasks", async (t) => {
  await request(app).post("/api/tasks").send({
    title: "Task A",
    description: "Test"
  })

  await request(app).post("/api/tasks").send({
    title: "Task B",
    description: "Test"
  })

  const res = await request(app).get("/api/tasks?sort=asc")

  t.equal(res.status, 200)
  t.ok(res.body.length >= 2)
})

t.test("GET /api/tasks/:id - valid", async (t) => {
  const createRes = await request(app).post("/api/tasks").send({
    title: "Find Me",
    description: "Test"
  })

  const id = createRes.body.id

  const res = await request(app).get(`/api/tasks/${id}`)

  t.equal(res.status, 200)
  t.equal(res.body.id, id)
})

t.test("GET /api/tasks/:id - not found", async (t) => {
  const res = await request(app).get("/api/tasks/999")

  t.equal(res.status, 404)
})

t.test("PUT /api/tasks/:id - update task", async (t) => {
  const createRes = await request(app).post("/api/tasks").send({
    title: "Old",
    description: "Old desc"
  })

  const id = createRes.body.id

  const res = await request(app)
    .put(`/api/tasks/${id}`)
    .send({
      title: "Updated",
      priority: "medium"
    })

  t.equal(res.status, 200)
  t.equal(res.body.title, "Updated")
  t.equal(res.body.priority, "medium")
})

t.test("PUT /api/tasks/:id - invalid data", async (t) => {
  const createRes = await request(app).post("/api/tasks").send({
    title: "Task",
    description: "Desc"
  })

  const id = createRes.body.id

  const res = await request(app)
    .put(`/api/tasks/${id}`)
    .send({
      completed: "yes"
    })

  t.equal(res.status, 400)
})

t.test("DELETE /api/tasks/:id - delete task", async (t) => {
  const createRes = await request(app).post("/api/tasks").send({
    title: "Delete me",
    description: "Test"
  })

  const id = createRes.body.id

  const res = await request(app).delete(`/api/tasks/${id}`)

  t.equal(res.status, 200)
})

t.test("DELETE /api/tasks/:id - not found", async (t) => {
  const res = await request(app).delete("/api/tasks/999")

  t.equal(res.status, 404)
})

t.test("GET /api/tasks/priority/:level", async (t) => {
  await request(app).post("/api/tasks").send({
    title: "High Task",
    description: "Test",
    priority: "high"
  })

  const res = await request(app).get("/api/tasks/priority/high")

  t.equal(res.status, 200)
  t.ok(res.body.every(task => task.priority === "high"))
})

t.test("GET /api/tasks/priority/:level - invalid", async (t) => {
  const res = await request(app).get("/api/tasks/priority/urgent")

  t.equal(res.status, 400)
})