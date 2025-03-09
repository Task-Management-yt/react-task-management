import React from "react";

interface NavbarProps {
    user: { name: string; email: string } | null;
    error: string;
    handleLogout: () => void;
    searchKeyword: string;
    handleSearch: (keyword: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, error, handleLogout, searchKeyword, handleSearch }) => {
    return (
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
    );
};

export default Navbar;