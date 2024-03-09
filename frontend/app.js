
const tasks = [
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 2', description: 'Schedule team meeting', status: 'completed' },
    { title: 'Task 3', description: 'Prepare presentation slides', status: 'pending', attachments: ['slides.pdf'] },
];

// Render tasks on the page
const taskList = document.getElementById('taskList');
tasks.forEach(task => {
    const { title, description, status, attachments = [] } = task;
    const attachmentLinks = attachments.map(file => `<a href="${file}" target="_blank">${file}</a>`).join(', ');
    const taskSummary = `<div class="task">
        <h3>${title}</h3>
        <p><span>Description:</span> ${description}</p>
        <p><span>Status:</span> ${status}</p>
        ${attachmentLinks ? `<p><span>Attachments:</span> ${attachmentLinks}</p>` : ''}
    </div>`;
    taskList.innerHTML += taskSummary;
});
// Fetch tasks from a REST API endpoint
const fetchTasks = async () => {
    try {
        const response = await fetch('https://api.example.com/tasks');
        const data = await response.json();
        console.log('Tasks fetched from API:', data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

fetchTasks();

// app.js
const filterCompletedTasks = (tasks, callback) => {
    const incompleteTasks = tasks.filter(task => task.status !== 'completed');
    callback(incompleteTasks);
};

// Fetch tasks from API and filter completed tasks
fetchTasks().then(tasks => {
    filterCompletedTasks(tasks, incompleteTasks => {
        console.log('Incomplete tasks:', incompleteTasks);
    });
});