import React from "react";
import TaskResponse from "../context/schema";

interface TaskListProps {
    tasks: TaskResponse[];
    isLoading: boolean;
    handleViewDetails: (task: TaskResponse) => void;
    handleEditTask: (task: TaskResponse) => void;
}

const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
};

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, handleViewDetails, handleEditTask }) => {
    return (
        <div className="row mb-5">
            {isLoading ? (
                <p className="text-center">Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="text-center">Tidak ada tugas yang ditemukan.</p>
            ) : (
                tasks.map((task) => (
                    <div className="col-md-6 col-lg-4 mb-3" key={task.id}>
                        <div className="card shadow-lg h-100">
                            <div className="card-header">
                                {task.status === "belum selesai" && <i className="bx bxs-calendar-exclamation text-secondary fs-4"></i>}
                                {task.status === "sedang berjalan" && <i className="bx bx-loader text-warning fs-4"></i>}
                                {task.status === "selesai" && <i className="bx bx-task text-success fs-4"></i>}
                                {` ${toTitleCase(task.status)}`}
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text flex-grow-1 text-truncate" style={{ maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {task.description}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">Deadline: {new Date(task.deadline).toLocaleDateString()}</small>
                                </p>
                                <div className="row">
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-primary mt-auto"
                                            onClick={() => handleViewDetails(task)}
                                        >
                                            Lihat Detail
                                        </button>
                                        <button
                                            className="btn btn-warning mt-auto"
                                            onClick={() => handleEditTask(task)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;