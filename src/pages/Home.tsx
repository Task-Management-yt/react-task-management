import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/authService";
import { getUserTasks, addTask, editTask, deleteTask } from "../services/taskService";
import TaskResponse from "../context/schema";
import TaskList from "../components/TaskList";
import TaskDetailModal from "../components/TaskDetailModal";
import TaskEditModal from "../components/TaskEditModal";
import TaskAddModal from "../components/TaskAddModal";
import Navbar from "../components/Navbar";

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

        return (
            <TaskList
                tasks={tasksToDisplay}
                isLoading={isLoading}
                handleViewDetails={handleViewDetails}
                handleEditTask={handleEditTask}
            />
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
                    <Navbar
                        user={user}
                        error={error}
                        handleLogout={handleLogout}
                        searchKeyword={searchKeyword}
                        handleSearch={handleSearch}
                    />

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="col-xl-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="text-muted">Daftar Tugas</h6>
                                    <button className="btn btn-primary" onClick={handleAddTask}>
                                        <i className="bx bx-plus"></i> Tambah Tugas
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
                                                    {`  ${category === "all" ? "SEMUA" : category.replace("_", " ").toUpperCase()}`} ({groupedTasks[category as keyof typeof groupedTasks]})
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
                                <div>&copy; {new Date().getFullYear()}, made by Yoni Tribber</div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Modal untuk menampilkan detail task */}
            <TaskDetailModal
                show={showDetailModal}
                handleClose={handleCloseDetailModal}
                selectedTask={selectedTask}
            />

            {/* Modal untuk edit task */}
            <TaskEditModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                editTaskData={editTaskData}
                handleSaveEdit={handleSaveEdit}
                setEditTaskData={setEditTaskData}
                editTaskErrors={editTaskErrors}
                handleDeleteTask={handleDeleteTask}
            />

            {/* Modal untuk tambah task */}
            <TaskAddModal
                show={showAddModal}
                handleClose={handleCloseAddModal}
                newTask={newTask}
                setNewTask={setNewTask}
                newTaskErrors={newTaskErrors}
                handleSaveTask={handleSaveTask}
            />
        </div>
    );
};

export default Home;