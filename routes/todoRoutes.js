const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//get fetch all todos

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// post // create new todo

// POST - create a new todo
router.post("/", async (req, res) => {
  try {
    // add this line to see what data is coming from frontend
    console.log("Request body:", req.body);

    const todo = new Todo({
      title: req.body.title,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    // send the actual error message so we can see what's wrong
    console.log("Error:", error.message);
    res.status(400).json({ message: error.message });
  }
});
// put update a todo
router.put("/:id", async (req, res) => {
  try {
    // update both title and completed if they are sent in the request
    const updatedFields = {};
    if (req.body.title !== undefined) updatedFields.title = req.body.title;
    if (req.body.completed !== undefined)
      updatedFields.completed = req.body.completed;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// for deleting todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "todo is deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    // log the actual error so we can see it
    console.log("GET Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
