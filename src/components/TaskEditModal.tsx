import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TaskResponse from "../context/schema";

interface TaskEditModalProps {
    show: boolean;
    handleClose: () => void;
    editTaskData: TaskResponse | null;
    handleSaveEdit: () => void;
    setEditTaskData: (task: TaskResponse | null) => void;
    editTaskErrors: { title?: string; deadline?: string };
    handleDeleteTask: (taskId: string) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
    show,
    handleClose,
    editTaskData,
    handleSaveEdit,
    setEditTaskData,
    editTaskErrors,
    handleDeleteTask,
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editTaskData && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editTaskData.title}
                                onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })}
                                isInvalid={!!editTaskErrors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {editTaskErrors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editTaskData.description}
                                onChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={editTaskData.status}
                                onChange={(e) => setEditTaskData({ ...editTaskData, status: e.target.value })}
                            >
                                <option value="belum selesai">Belum Selesai</option>
                                <option value="sedang berjalan">Sedang Berjalan</option>
                                <option value="selesai">Selesai</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                value={editTaskData.deadline}
                                onChange={(e) => setEditTaskData({ ...editTaskData, deadline: e.target.value })}
                                isInvalid={!!editTaskErrors.deadline}
                            />
                            <Form.Control.Feedback type="invalid">
                                {editTaskErrors.deadline}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => editTaskData && handleDeleteTask(editTaskData.id)}>
                    Hapus Task
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleSaveEdit}>
                    Simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskEditModal;