// server.js
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Dummy task data
const tasks = [
    { title: 'Task 1', description: 'Complete project report', status: 'pending' },
    { title: 'Task 2', description: 'Schedule team meeting', status: 'completed' },
    { title: 'Task 3', description: 'Prepare presentation slides', status: 'pending' },
];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Route to fetch tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Route to handle Excel file uploads
app.post('/upload', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const excelFile = req.file.path;
    const workbook = xlsx.readFile(excelFile);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    console.log('Data from Excel file:', data);
    res.send('File uploaded successfully!');
});

// server.js
// ...

// Route to fetch tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Route to create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.json(newTask);
});

// Route to update a task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Route to delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        res.json(deletedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});
