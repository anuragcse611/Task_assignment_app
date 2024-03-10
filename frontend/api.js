
//import { fetchTasksAndRender } from "./app";
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


// async function fetchTasks() {
//     try {
//         const response = await fetch('http://localhost:3000/api/fetchtasks');
//         if (response.ok) {
//             tasks = await response.json();
//             console.log('Tasks:', tasks);
//         } else {
//             throw new Error('Failed to fetch tasks');
//         }
//     } catch (error) {
//         console.error(error.message);
//     }
// }

export { addTask };