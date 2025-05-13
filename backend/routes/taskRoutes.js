const express = require("express")

const Task = require("../models/modelTasks")
const router = express.Router()



router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const oneTask = await Task.findById(req.params.id)
    if(!oneTask) res.status(404).json({message: "Tache non trouve"})
    res.status(200).json(oneTask)
})

router.post('/', async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  const saved = await newTask.save();
  res.json(saved);
});

// Extrait dans taskRoutes.js
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// PATCH: toggle completed
router.patch('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

module.exports = router;