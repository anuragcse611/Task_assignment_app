
const tasks = [
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 2', description: 'Schedule team meeting', status: 'completed' },
    { title: 'Task 3', description: 'Prepare presentation slides', status: 'pending', attachments: ['slides.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
    { title: 'Task 1', description: 'Complete project report', status: 'pending', attachments: ['report.pdf'] },
];

// Render tasks on the page
const taskList = document.getElementById('taskList');
// Modify the task rendering to include an ID for each task
tasks.forEach((task, index) => {
    const { title, description, status, attachments = [] } = task;
    const attachmentLinks = attachments.map(file => `<a href="${file}" target="_blank">${file}</a>`).join(', ');
    const taskSummary = `
    <div class="task" data-task-index="${index}"> <!-- Add a data attribute to store the task index -->
        <div class="task_details">
            <h3>${title}</h3>
            <p><span>Description:</span> ${description}</p>
            <p><span>Status:</span> ${status}</p>
            ${attachmentLinks ? `<p><span>Attachments:</span> ${attachmentLinks}</p>` : ''}
        </div>
        <div class="task_button">
            <input type="submit" name="task_Remove" value="Remove" style="background-color:grey">
            <input type="submit" name="task_edit" value="Edit">
        </div>
    </div>
    `;
    taskList.innerHTML += taskSummary;
});

// Add event listeners to the "Edit" buttons to open the modal and pass the task data
const editButtons = document.querySelectorAll('[name="task_edit"]');
editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const taskIndex = index; // Retrieve the task index associated with the clicked button
        const task = tasks[taskIndex]; // Retrieve the task object based on the index
        // Populate the modal with task data
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('status').value = task.status;
        // Open the modal
        document.querySelector('.modal').style.display = 'block';
    });
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