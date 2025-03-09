import React from "react";
import { Modal, Button } from "react-bootstrap";
import TaskResponse from "../context/schema";

interface TaskDetailModalProps {
    show: boolean;
    handleClose: () => void;
    selectedTask: TaskResponse | null;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ show, handleClose, selectedTask }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedTask?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedTask && (
                    <>
                        <p>{selectedTask.description}</p>
                        <p>
                            <strong>Status:</strong> {selectedTask.status}
                        </p>
                        <p>
                            <strong>Deadline:</strong> {new Date(selectedTask.deadline).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(selectedTask.created_at).toLocaleDateString()}
                        </p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskDetailModal;