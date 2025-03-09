import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface TaskAddModalProps {
    show: boolean;
    handleClose: () => void;
    newTask: { title: string; description: string; status: string; deadline: string };
    setNewTask: (task: { title: string; description: string; status: string; deadline: string }) => void;
    newTaskErrors: { title?: string; deadline?: string };
    handleSaveTask: () => void;
}

const TaskAddModal: React.FC<TaskAddModalProps> = ({
    show,
    handleClose,
    newTask,
    setNewTask,
    newTaskErrors,
    handleSaveTask,
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            isInvalid={!!newTaskErrors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {newTaskErrors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
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
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                            isInvalid={!!newTaskErrors.deadline}
                        />
                        <Form.Control.Feedback type="invalid">
                            {newTaskErrors.deadline}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleSaveTask}>
                    Simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskAddModal;