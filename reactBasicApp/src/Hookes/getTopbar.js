import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:4500/';

const useTopbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCheck, setSortCheck] = useState('newest');

    const handleShowModal = (task = null) => {
        setCurrentTask(task);
        setIsEditing(!!task);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTask(null);
        setIsEditing(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSort = (querychange) => {
        setSortCheck(querychange);
    };

    const handleSaveTask = async (newTask) => {
        try {
            if (isEditing) {
                const updatedTasks = tasks.map(task =>
                    task.id === newTask.id ? newTask : task
                );
                setTasks(updatedTasks);
                console.log(updatedTasks)
                await axios.put(`${BASE_URL}${newTask.id}`, newTask);
            } else {
                const newTaskWithId = { ...newTask, id: Date.now(), status: false };
                const updatedTasks = [...tasks, newTaskWithId];
                setTasks(updatedTasks);
                await axios.post(BASE_URL, newTaskWithId);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save the task.");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            await axios.delete(`${BASE_URL}${taskId}`);
        } catch (error) {
            console.error(error);
            alert("Failed to delete the task.");
        }
    };

    const handleToggleStatus = async (taskId) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (!taskToUpdate) {
                throw new Error('Task not found');
            }
            const updatedTask = { ...taskToUpdate, status: !taskToUpdate.status };
            await axios.put(`${BASE_URL}${taskId}`, updatedTask);
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? updatedTask : task
            );
            setTasks(updatedTasks);
            console.log("completed: ", updatedTasks);
        } catch (error) {
            console.error(error);
            alert("Failed to toggle the task status.");
        }
    };

    const handleDeleteAll = async () => {
        try {
            const updatedTasks = tasks.filter(task => !task.status);
            setTasks(updatedTasks);
            await axios.delete(`${BASE_URL}completed`);
        } catch (error) {
            console.error(error);
            alert("Failed to delete completed tasks.");
        }
    };
    
    
    useEffect(() => {
        axios.get(BASE_URL)
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error(error);
            alert("Not able to fetch data from node");
        });
    }, []);
    
    

    return {
        showModal,
        tasks,
        currentTask,
        isEditing,
        searchQuery,
        sortCheck,
        handleShowModal,
        handleCloseModal,
        handleSearch,
        handleSort,
        handleSaveTask,
        setTasks,
        handleDelete,
        handleToggleStatus,
        handleDeleteAll
    };
};

export default useTopbar;
