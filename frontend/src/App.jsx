import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = "http://localhost:3017/api/tasks";

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Erreur lors du fetch des tâches :", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await fetch(`${API_URL}/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>✅ Ma Todo List</h1>

      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAdd}>Ajouter</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ margin: '10px 0' }}>
             <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
            />
        <span
         style={{
          marginLeft: '10px',
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
              {task.text}
            </span>
            <button onClick={() => handleDelete(task._id)} style={{ marginLeft: '10px' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
