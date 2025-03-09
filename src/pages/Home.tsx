import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/authService";
import { useEffect, useState } from "react";
import { getUserTasks, addTask, editTask, deleteTask } from "../services/taskService";
import TaskResponse from "../context/schema";
import { Modal, Button, Form } from "react-bootstrap";

const Home = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<{ id: string; name: string; username: string; email: string } | null>(null);
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskResponse[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const [editTaskData, setEditTaskData] = useState<TaskResponse | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "",
        deadline: "",
    });

    const [newTaskErrors, setNewTaskErrors] = useState<{ title?: string; deadline?: string }>({});
    const [editTaskErrors, setEditTaskErrors] = useState<{ title?: string; deadline?: string }>({});

    // Fetch user and tasks on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);

                const taskData = await getUserTasks();
                setTasks(taskData);
                setFilteredTasks(taskData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Handle search functionality
    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        const filtered = tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(keyword.toLowerCase()) ||
                task.description.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    // Group tasks by status
    const groupedTasks = {
        all: filteredTasks.length,
        belum_selesai: filteredTasks.filter((task) => task.status.toLowerCase() === "belum selesai").length,
        sedang_berjalan: filteredTasks.filter((task) => task.status.toLowerCase() === "sedang berjalan").length,
        selesai: filteredTasks.filter((task) => task.status.toLowerCase() === "selesai").length,
    };

    // Handle viewing task details
    const handleViewDetails = (task: TaskResponse) => {
        setSelectedTask(task);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedTask(null);
    };

    // Handle editing task
    const handleEditTask = (task: TaskResponse) => {
        // Format deadline ke YYYY-MM-DD
        const formattedDeadline = new Date(task.deadline).toISOString().split("T")[0];
        setEditTaskData({
            ...task,
            deadline: formattedDeadline, // Update deadline dengan format yang benar
        });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditTaskData(null);
        setEditTaskErrors({});
    };

    // Validasi form edit task
    const validateEditTask = () => {
        const errors: { title?: string; deadline?: string } = {};

        if (!editTaskData?.title.trim()) {
            errors.title = "Title is required";
        }

        if (!editTaskData?.deadline) {
            errors.deadline = "Deadline is required";
        }

        setEditTaskErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSaveEdit = async () => {
        if (!validateEditTask()) {
            return;
        }

        if (editTaskData) {
            try {
                const updatedTask = await editTask(editTaskData.id, editTaskData);
                setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
                setFilteredTasks(filteredTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
                setShowEditModal(false);
                setEditTaskErrors({});
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setError("Failed to edit task");
            }
        }
    };

    // Handle deleting task
    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter((task) => task.id !== taskId));
            setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
            setShowEditModal(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("Failed to delete task");
        }
    };

    // Handle adding new task
    const handleAddTask = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setNewTask({ title: "", description: "", status: "", deadline: "" });
        setNewTaskErrors({});
    };

    // Validasi form tambah task
    const validateNewTask = () => {
        const errors: { title?: string; deadline?: string } = {};

        if (!newTask.title.trim()) {
            errors.title = "Title is required";
        }

        if (!newTask.deadline) {
            errors.deadline = "Deadline is required";
        }

        setNewTaskErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSaveTask = async () => {
        if (!validateNewTask()) {
            return;
        }

        try {
            const savedTask = await addTask(newTask);
            setTasks([...tasks, savedTask]);
            setFilteredTasks([...filteredTasks, savedTask]);
            setShowAddModal(false);
            setNewTask({ title: "", description: "", status: "", deadline: "" });
            setNewTaskErrors({});
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("Failed to add task");
        }
    };

    // Render task list based on active tab
    const renderTaskList = (category: string) => {
        const tasksToDisplay =
            category === "all"
                ? filteredTasks
                : filteredTasks.filter((task) => task.status.toLowerCase() === category.replace("_", " "));

        return isLoading ? (
            <p className="text-center">Loading tasks...</p>
        ) : tasksToDisplay.length === 0 ? (
            <p className="text-center">Tidak ada tugas yang ditemukan.</p>
        ) : (
            <div className="row mb-5">
                {tasksToDisplay.map((task) => (
                    <div className="col-md-6 col-lg-4 mb-3" key={task.id}>
                        <div className="card shadow-lg h-100">
                            <div className="card-header">
                                {task.status === "belum selesai" && <i className="bx bxs-calendar-exclamation text-secondary fs-4"></i>}
                                {task.status === "sedang berjalan" && <i className="bx bx-loader text-warning fs-4"></i>}
                                {task.status === "selesai" && <i className="bx bx-task text-success fs-4"></i>}
                                {` ${task.status}`}
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
                                            View Details
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
                ))}
            </div>
        );
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="layout-wrapper layout-content-navbar layout-without-menu">
            <div className="layout-container">
                <div className="layout-page">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
                        <div className="navbar-nav-right d-flex align-items-center w-100">
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center">
                                    <i className="bx bx-search fs-4 lh-0"></i>
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search..."
                                        aria-label="Search..."
                                        value={searchKeyword}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <ul className="navbar-nav flex-row align-items-center ms-auto">
                                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                    <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                                        <div className="avatar avatar-online">
                                            <img src="/assets/img/avatars/0.svg" alt="User" className="w-px-40 h-auto rounded-circle" />
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {error ? (
                                            <p className="text-danger">{error}</p>
                                        ) : user ? (
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar avatar-online">
                                                                <img src="/assets/img/avatars/0.svg" alt="User" className="w-px-40 h-auto rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <span className="fw-semibold d-block">{user.name}</span>
                                                            <small className="text-muted">{user.email}</small>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        ) : (
                                            <p>Loading user data...</p>
                                        )}
                                        <li><div className="dropdown-divider"></div></li>
                                        <li><a className="dropdown-item" href="/" onClick={handleLogout}>Log Out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="col-xl-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="text-muted">Daftar Tugas</h6>
                                    <button className="btn btn-primary" onClick={handleAddTask}>
                                        <i className="bx bx-plus"></i> Tambah Task
                                    </button>
                                </div>
                                <div className="nav-align-top mb-4">
                                    <ul className="nav nav-tabs nav-fill" role="tablist">
                                        {["all", "belum_selesai", "sedang_berjalan", "selesai"].map((category) => (
                                            <li className="nav-item" key={category}>
                                                <button
                                                    type="button"
                                                    className={`nav-link ${activeTab === category ? "active" : ""}`}
                                                    onClick={() => setActiveTab(category)}
                                                >
                                                    {category === "all" && <i className="bx bxs-grid"></i>}
                                                    {category === "belum_selesai" && <i className="bx bxs-calendar-exclamation text-secondary"></i>}
                                                    {category === "sedang_berjalan" && <i className="bx bx-loader text-warning"></i>}
                                                    {category === "selesai" && <i className="bx bx-task text-success"></i>}
                                                    {`  ${category.replace("_", " ").toUpperCase()}`} ({groupedTasks[category as keyof typeof groupedTasks]})
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="tab-content">
                                        {renderTaskList(activeTab)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="content-footer footer bg-footer-theme">
                            <div className="container-xxl d-flex flex-wrap justify-content-between py-2">
                                <div>&copy; {new Date().getFullYear()}, made with ❤️ by ThemeSelection</div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Modal untuk menampilkan detail task */}
            <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
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
                    <Button variant="secondary" onClick={handleCloseDetailModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal untuk edit task */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
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
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal untuk tambah task */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
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
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveTask}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;