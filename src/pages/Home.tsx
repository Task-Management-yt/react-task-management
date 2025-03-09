import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="layout-wrapper layout-content-navbar layout-without-menu">
            <div className="layout-container">
                {/* Layout Page */}
                <div className="layout-page">
                    {/* Navbar */}
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
                        <div className="navbar-nav-right d-flex align-items-center w-100">
                            {/* Search Bar */}
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center">
                                    <i className="bx bx-search fs-4 lh-0"></i>
                                    <input type="text" className="form-control border-0 shadow-none" placeholder="Search..." aria-label="Search..." />
                                </div>
                            </div>

                            {/* User Profile */}
                            <ul className="navbar-nav flex-row align-items-center ms-auto">
                                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                    <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                                        <div className="avatar avatar-online">
                                            <img src="/assets/img/avatars/0.svg" alt="User" className="w-px-40 h-auto rounded-circle" />
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 me-3">
                                                        <div className="avatar avatar-online">
                                                            <img src="/assets/img/avatars/0.svg" alt="User" className="w-px-40 h-auto rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <span className="fw-semibold d-block">John Doe</span>
                                                        <small className="text-muted">Admin</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li><div className="dropdown-divider"></div></li>
                                        <li><a className="dropdown-item" href="#">My Profile</a></li>
                                        <li><a className="dropdown-item" href="#">Settings</a></li>
                                        <li><a className="dropdown-item" href="#">Billing</a></li>
                                        <li><div className="dropdown-divider"></div></li>
                                        <li><a className="dropdown-item" href="auth-login-basic.html">Log Out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Content */}
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="col-xl-12">
                                <h6 className="text-muted">Daftar Tugas</h6>
                                <div className="nav-align-top mb-4">
                                    <ul className="nav nav-tabs nav-fill" role="tablist">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link active"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-home"
                                                aria-controls="navs-justified-home"
                                                aria-selected="true"
                                            >
                                                <i className='bx bxs-grid'></i> Semua
                                                <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger">3</span>
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-profile"
                                                aria-controls="navs-justified-profile"
                                                aria-selected="false"
                                            >
                                                <i className='bx bxs-calendar-exclamation'></i> Belum Selesai
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-messages"
                                                aria-controls="navs-justified-messages"
                                                aria-selected="false"
                                            >
                                                <i className="tf-icons bx bx-loader"></i> Sedang Berjalan
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-messages"
                                                aria-controls="navs-justified-messages"
                                                aria-selected="false"
                                            >
                                                <i className="tf-icons bx bx-task"></i> Selesai
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="navs-justified-home" role="tabpanel">
                                            <p>
                                                Icing pastry pudding oat cake. Lemon drops cotton candy caramels cake caramels sesame snaps
                                                powder. Bear claw candy topping.
                                            </p>
                                            <p className="mb-0">
                                                Tootsie roll fruitcake cookie. Dessert topping pie. Jujubes wafer carrot cake jelly. Bonbon
                                                jelly-o jelly-o ice cream jelly beans candy canes cake bonbon. Cookie jelly beans marshmallow
                                                jujubes sweet.
                                            </p>
                                        </div>
                                        <div className="tab-pane fade" id="navs-justified-profile" role="tabpanel">
                                            <p>
                                                Donut dragée jelly pie halvah. Danish gingerbread bonbon cookie wafer candy oat cake ice
                                                cream. Gummies halvah tootsie roll muffin biscuit icing dessert gingerbread. Pastry ice cream
                                                cheesecake fruitcake.
                                            </p>
                                            <p className="mb-0">
                                                Jelly-o jelly beans icing pastry cake cake lemon drops. Muffin muffin pie tiramisu halvah
                                                cotton candy liquorice caramels.
                                            </p>
                                        </div>
                                        <div className="tab-pane fade" id="navs-justified-messages" role="tabpanel">
                                            <p>
                                                Oat cake chupa chups dragée donut toffee. Sweet cotton candy jelly beans macaroon gummies
                                                cupcake gummi bears cake chocolate.
                                            </p>
                                            <p className="mb-0">
                                                Cake chocolate bar cotton candy apple pie tootsie roll ice cream apple pie brownie cake. Sweet
                                                roll icing sesame snaps caramels danish toffee. Brownie biscuit dessert dessert. Pudding jelly
                                                jelly-o tart brownie jelly.
                                            </p>
                                        </div>
                                        <div className="tab-pane fade" id="navs-justified-messages" role="tabpanel">
                                            <p>
                                                Oat cake chupa chups dragée donut toffee. Sweet cotton candy jelly beans macaroon gummies
                                                cupcake gummi bears cake chocolate.
                                            </p>
                                            <p className="mb-0">
                                                Cake chocolate bar cotton candy apple pie tootsie roll ice cream apple pie brownie cake. Sweet
                                                roll icing sesame snaps caramels danish toffee. Brownie biscuit dessert dessert. Pudding jelly
                                                jelly-o tart brownie jelly.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="content-footer footer bg-footer-theme">
                            <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                                <div className="mb-2 mb-md-0">
                                    &copy; {new Date().getFullYear()}, made with ❤️ by
                                    <a href="https://themeselection.com" target="_blank" className="footer-link fw-bolder"> ThemeSelection</a>
                                </div>
                                <div>
                                    <a href="https://themeselection.com/license/" className="footer-link me-4" target="_blank">License</a>
                                    <a href="https://themeselection.com/" className="footer-link me-4" target="_blank">More Themes</a>
                                    <a href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/" className="footer-link me-4" target="_blank">Documentation</a>
                                    <a href="https://github.com/themeselection/sneat-html-admin-template-free/issues" className="footer-link me-4" target="_blank">Support</a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
