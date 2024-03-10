async function fetchTasksAndRender() {
    try {
        const response = await fetch('http://localhost:3000/api/fetchtasks');
        if (response.ok) {
            const tasks = await response.json();
            console.log('Tasks:', tasks);
            renderTasks(tasks); // Render tasks after fetching them
        } else {
            throw new Error('Failed to fetch tasks');
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Function to render tasks on the page
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const { title, description, status, attachments = [] } = task;
        const attachmentLinks = attachments.map(file => `<a href="${file}" target="_blank">${file}</a>`).join(', ');
        const taskSummary = `
            <div class="task" data-task-index="${index}">
                <div class="task_details">
                    <h3>${title}</h3>
                    <p><span>Description:</span> ${description}</p>
                    <p><span>Status:</span> ${status}</p>
                    ${attachmentLinks ? `<p><span>Attachments:</span> ${attachmentLinks}</p>` : ''}
                </div>
                <div class="task_button">
                    <input type="submit" name="task_Remove" value="Remove" style="background-color:grey">
                    <input type="button" name="task_edit" value="Edit">
                </div>
            </div>
        `;
        taskList.innerHTML += taskSummary;
    });

    // Add event listeners to the "Edit" buttons
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
            const modal = document.querySelector('.modal');
            modal.style.display = 'block';
    
            // Add event listener to the submit button inside the modal
            const submitButton = document.getElementById('save-task');
            submitButton.onclick = async () => {
                // Call the editTask function with the form data and task ID
                const form = document.getElementById('task-form');
                const taskId = task.id; // Assuming each task has an ID property
                const edited = await editTask(form, taskId);
                
                // If editing is successful, close the modal
                if (edited) {
                    modal.style.display = 'none';
                }
            };
        });
    });
    
}

async function addTask(form) {
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;

    console.log("d", title, description, status);
    try {
        if (!title || !description) {
            throw new Error('Title and description cannot be empty');
        }

        const response = await fetch('http://localhost:3000/api/addtask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        });

        if (response.ok) {
            const newTask = await response.json();
            // After adding the task successfully, fetch and render tasks again
            fetchTasksAndRender();
            return newTask;
        } else {
            throw new Error('Failed to add task');
        }
    } catch (error) {
        console.error(error.message);
    }
}


async function editTask(form, taskId) {
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;
    

    console.log("Editing Task:", title, description, status);
    try {
        if (!title || !description) {
            throw new Error('Title and description cannot be empty');
        }

        const response = await fetch(`http://localhost:3000/api/edittask/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        });

        if (response.ok) {
            // If editing is successful, fetch and render tasks again
            fetchTasksAndRender();
            return true;
        } else {
            throw new Error('Failed to edit task');
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}



// Call fetchTasksAndRender when the page is first loaded
fetchTasksAndRender();
// export { fetchTasksAndRender };
