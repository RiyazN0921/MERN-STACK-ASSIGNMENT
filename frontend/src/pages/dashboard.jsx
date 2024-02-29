// TaskManagerPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Task components
const TaskList = ({ tasks, onEditClick, onMarkAsCompleted, onDeleteTask }) => {
    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.description}
                        <button onClick={() => onEditClick(task.id)}>Edit</button>
                        <button onClick={() => onMarkAsCompleted(task.id)}>Mark as Completed</button>
                        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CreateTask = ({ onCreateTask }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        category: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/api/task`, formData);
            onCreateTask(response.data);
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                category: '',
            });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date" />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
            <button type="submit">Create Task</button>
        </form>
    );
};

const EditTask = ({ taskId, initialTaskData, onCancelEdit, onEditTask }) => {
    const [formData, setFormData] = useState(initialTaskData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:9000/api/task/${taskId}`, formData);
            onEditTask(taskId, response.data);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date" />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
            <button type="submit">Save Changes</button>
            <button onClick={onCancelEdit}>Cancel</button>
        </form>
    );
};

const DeleteTask = ({ taskId, onDeleteTask }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:9000/api/tasks/${taskId}`);
            onDeleteTask(taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete Task</button>
    );
};

const TaskManagerPage = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/task`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleCreateTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleEditTask = (taskId, updatedTask) => {
        const updatedTasks = tasks.map(task => task.id === taskId ? updatedTask : task);
        setTasks(updatedTasks);
        setEditingTaskId(null);
    };

    const handleMarkAsCompleted = async (taskId) => {
        try {
            const response = await axios.patch(`http://localhost:9000/api/task/${taskId}/complete`);
            const updatedTasks = tasks.map(task => task.id === taskId ? response.data : task);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <CreateTask onCreateTask={handleCreateTask} />
            <TaskList tasks={tasks} onEditClick={handleEditClick} onMarkAsCompleted={handleMarkAsCompleted} onDeleteTask={handleDeleteTask} />
            {editingTaskId && <EditTask taskId={editingTaskId} initialTaskData={tasks.find(task => task.id === editingTaskId)} onCancelEdit={handleCancelEdit} onEditTask={handleEditTask} />}
        </div>
    );
};

export default TaskManagerPage;
