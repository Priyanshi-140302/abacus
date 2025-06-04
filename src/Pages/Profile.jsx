import React from 'react'
import profile from '../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="main-container bg-theme profile-page">
                <div className="container-fluid header">
                    <div className="container">
                        <div className="row py-3 bg-stars">
                            <div className="col-9 d-flex align-items-center">
                                <div className="d-flex align-items-center text-white fw-semibold">
                                    <h5 className="me-2 mb-0" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </h5>
                                    <h6 className="mb-0 fs-22">Profile</h6>
                                </div>
                            </div>
                            <div className="col-3 text-end">
                                <div class="dropdown">
                                    <button class="btn profile-btn dropdown-toggle border-0 rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={profile} alt="" className="" />
                                    </button>
                                    <ul class="dropdown-menu mt-4 border-0 shadow rounded-4 overflow-hidden">
                                        <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><Link class="dropdown-item" to="/">Logout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container py-5">
                        <div className="row g-4">
                            {/* Profile Card */}
                            <div className="col-lg-6">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header p-3 custom-gradient text-white">
                                        <h3 className="h5 mb-0 d-flex align-items-center gap-2">
                                            <div className="p-2 bg-white bg-opacity-25 rounded">
                                                <i className="bi bi-person-fill"></i>
                                            </div>
                                            PROFILE PAGE
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-person-fill text-primary me-1"></i> Name:
                                            </label>
                                            <h2 className="form-control fs-3 fw-bolder rounded-4">John Doe</h2>
                                        </div>
                                        <div className="pt-3 border-top mt-4">
                                            <button className="btn btn-outline-danger rounded-pill py-2 w-100 fw-semibold">
                                                <i className="bi bi-box-arrow-right me-1"></i> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Change Password Card */}
                            <div className="col-lg-6">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header p-3 custom-gradient text-white">
                                        <h3 className="h5 mb-0 d-flex align-items-center gap-2">
                                            <div className="p-2 bg-white bg-opacity-25 rounded">
                                                <i className="bi bi-lock-fill"></i>
                                            </div>
                                            CHANGE PASSWORD
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label fs-5 fw-semibold text-dark">
                                                <i className="bi bi-key-fill text-primary me-1"></i> Enter your new password:
                                            </label>
                                            <input type="password" className="form-control shadow-none" id="newPassword" placeholder="Enter new password" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label fs-5 fw-semibold text-dark">
                                                <i className="bi bi-key-fill text-primary me-1"></i> Confirm your password:
                                            </label>
                                            <input type="password" className="form-control shadow-none" id="newPassword" placeholder="Enter password" />
                                        </div>
                                        <button className="btn btn-green rounded-pill py-2 w-100 fw-semibold">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile