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
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
                const taskData = await getUserTasks();
                setTasks(taskData);
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

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const filteredTasks = tasks
        .filter((task) => activeTab === "all" || task.status.toLowerCase() === activeTab.replace("_", " "))
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const taskCounts = filteredTasks.reduce((acc: { [key: string]: number }, task) => {
        const key = task.status.replace(" ", "_").toLowerCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { all: filteredTasks.length, belum_selesai: 0, sedang_berjalan: 0, selesai: 0 });

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
                                        placeholder="Cari tugas..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
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
                                <h6 className="text-muted">Daftar Tugas</h6>
                                <div className="nav-align-top mb-4">
                                    <ul className="nav nav-tabs nav-fill" role="tablist">
                                        {["all", "belum_selesai", "sedang_berjalan", "selesai"].map((category) => (
                                            <li className="nav-item" key={category}>
                                                <button
                                                    type="button"
                                                    className={`nav-link ${activeTab === category ? "active" : ""}`}
                                                    onClick={() => setActiveTab(category)}
                                                >
                                                    {category.replace("_", " ").toUpperCase()} ({taskCounts[category as keyof typeof taskCounts] || 0})
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="tab-content">
                                        {isLoading ? (
                                            <p className="text-center">Loading tasks...</p>
                                        ) : filteredTasks.length === 0 ? (
                                            <p className="text-center">Tidak ada tugas yang ditemukan.</p>
                                        ) : (
                                            <div className="row mb-5">
                                                {filteredTasks.map((task) => (
                                                    <div className="col-md-6 col-lg-4 mb-3" key={task.id}>
                                                        <div className="card h-100">
                                                            <div className="card-header">
                                                                {task.status.toUpperCase()}
                                                            </div>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{task.title}</h5>
                                                                <p className="card-text">
                                                                    {task.description.length > 100 ? task.description.substring(0, 100) + "..." : task.description}
                                                                </p>
                                                                <button className="btn btn-primary" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;