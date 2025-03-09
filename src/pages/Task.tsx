// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface TaskResponse {
    id: string;
    title: string;
    description: string;
    deadline: string;
    status: string;
    created_at: string;
}

const Task = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task as TaskResponse | undefined; // Ambil task dari state

    if (!task) {
        return <p className="text-center">Task not found.</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header">
                    <h3 className="card-title">{task.title}</h3>
                </div>
                <div className="card-body">
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                        <strong>Status:</strong> {task.status}
                    </p>
                    <p className="card-text">
                        <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                        <strong>Created At:</strong> {new Date(task.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={() => navigate("/")}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;