import React from 'react'
import './TaskList.css'

const TaskList = ({ tasks, setTasks, handleShowModal, searchQuery, sortQuery, handleDelete, handleToggleStatus,handleDeleteAll  }) => {
    const handleDeleteTask = async (taskId) => {
        handleDelete(taskId);
        window.location.reload(true)
    };

    const getTaskStyle = (task) => {
        return {
          color: isPastDueDate(task.dueDate) ? '#C03503' : '#667085',
          backgroundColor: isPastDueDate(task.dueDate) ? '#C035030F' : 'inherit',
          padding: isPastDueDate(task.dueDate) ? '8px' : '8px',
          borderRadius: isPastDueDate(task.dueDate) ? '4px'  : '4px',
          width: isPastDueDate(task.dueDate) ? '148px'  : '148px'
        };
      };
    
    const handleComplete = (taskId) => {
        handleToggleStatus(taskId);
    };

    const isPastDueDate = (dueDate) => {
        const today = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate < today;
    };

    const activeTasks = tasks.filter(task => !task.status);
    const completedTasks = tasks.filter(task => task.status);
    const filteredActiveTasks = activeTasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    let sortedallTasks;
    if (sortQuery === 'newest') {
        sortedallTasks = filteredActiveTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
        sortedallTasks = filteredActiveTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }

    const handleClear = () => {
        handleDeleteAll();
    };

    return (
        <div className="container">
        <div className="task-list">
            <div className="top-head">
                <h4>Active Tasks</h4>
            </div>
            {sortedallTasks?.map(task => (
                <div>
                <div key={task.id} className="task-item">
                    <div className="heading">
                        <div className="left-heading">
                            <input
                                type="radio"
                                checked={task.status}
                                onChange={() => handleComplete(task.id)}
                            />
                            <h4>{task.title}</h4>
                            <img className="signal-img" src="/src/assets/image/orange-dot.svg" alt="" />
                        </div>
                        <div className="right-pic">
                            <img src="/src/assets/image/pen.svg" alt="Edit" onClick={() => handleShowModal(task)} />
                            <img src="/src/assets/image/delete.svg" data-bs-toggle="modal" data-bs-target="#deletetask-modal" alt="Delete" />
                        </div>
                    </div>
                    <div className="para-content">
                        <p>{task.description}</p>
                        <span style={getTaskStyle(task)}>
                            <img src={isPastDueDate(task.dueDate) ? "/src/assets/image/calendar-red.svg" : "/src/assets/image/calendar.svg"} alt="Calendar" /> by {task.dueDate}
                        </span>
                    </div>
                </div>
                <div className="modal" id="deletetask-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog-delete">
                        <div className="modal-content-delete">
                            <div className="modal-header-delete">
                                <div className="cross">
                                    <img src="/src/assets/image/cross.svg" onClick = {() =>window.location.reload(true) }/>
                                </div>
                                <h4 className="modal-title-delete" id="deletetask-modal-label">Delete Task ?</h4>
                            </div>
                            <div className="modal-body-delete">
                                <h3>Are you sure you want to delete this task?</h3>
                            </div>
                            <div className="modal-footer-delete">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick = {() =>window.location.reload(true) }>Cancel</button>
                                <button type="button" className="btn btn-danger del-task-btn " onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            <div className="top-head">
                <div className="clear-complete">
                <h4>Completed Tasks</h4>
                <button className="button-second" onClick={handleClear}>Clear Completed Tasks</button>
                </div>
            </div>
            {completedTasks.map(task => (
                <div key={task.id} className="task-item">
                    <div className="heading">
                        <div className="left-heading">
                            <img src="/src/assets/image/done.svg"
                                checked={task.status}
                                onClick={() => handleComplete(task.id)}
                            />
                            <h4>{task.title}</h4>
                            <img className="signal-img" src="/src/assets/image/green-dot.svg" alt="" />
                        </div>
                        <div className="right-pic">
                            <img src="/src/assets/image/pen.svg" alt="Edit" onClick={() => handleShowModal(task)} />
                            <img src="/src/assets/image/delete.svg" alt="Delete" onClick={() => handleDelete(task.id)} />
                        </div>
                    </div>
                    <div className="para-content">
                        <p>{task.description}</p>
                        <span style={getTaskStyle(task)}>
                            <img src={isPastDueDate(task.dueDate) ? "/src/assets/image/calendar-red.svg" : "/src/assets/image/calendar.svg"} alt="Calendar" /> by {task.dueDate}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default TaskList