import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/authService";
import { useEffect, useState } from "react";
import { getUserTasks } from "../services/taskService";

interface TaskResponse {
    id: string;
    title: string;
    description: string;
    deadline: string;
    status: string;
    created_at: string;
}

const Home = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<{ id: string; name: string; username: string; email: string } | null>(null);
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskResponse[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchKeyword, setSearchKeyword] = useState("");

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

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        const filtered = tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(keyword.toLowerCase()) ||
                task.description.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    const groupedTasks = {
        all: filteredTasks.length,
        belum_selesai: filteredTasks.filter((task) => task.status.toLowerCase() === "belum selesai").length,
        sedang_berjalan: filteredTasks.filter((task) => task.status.toLowerCase() === "sedang berjalan").length,
        selesai: filteredTasks.filter((task) => task.status.toLowerCase() === "selesai").length,
    };

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
                        <div className="card shadow-lg h-100"> {/* Tinggi card sama */}
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
                                <a href="#" className="btn btn-primary mt-auto">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
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
                                    <button className="btn btn-primary" onClick={() => navigate("/add-task")}>
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
        </div>
    );
};

export default Home;