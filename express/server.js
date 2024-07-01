const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample data (simulating a database)
let todos = [
    { id: 1, text: 'Learn Express.js' },
    { id: 2, text: 'Build a CRUD API' },
];

// Routes
// GET all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedText = req.body.text;

    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.text = updatedText;
        }
        return todo;
    });

    res.json(todos.find(todo => todo.id === id));
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.sendStatus(204); // No content
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
