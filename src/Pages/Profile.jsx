import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;
import Header from '../components/Header';

const Profile = () => {
    const navigate = useNavigate();


    const [data, setData] = useState();

    const getData = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const response = await axios.get(`${URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setData(response.data); // Axios auto-parses JSON
            } else {
                console.error('Failed to fetch:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        getData();
    }, [])


    return (
        <>
            <div className="main-container bg-theme profile-page">
               

                <Header data={{ title: '', detail: 'Profile', description: '' }} />
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
                                            <h2 className="form-control fs-3 fw-bolder rounded-4">{data?.username}</h2>
                                        </div>
                                        <div className="pt-3 border-top mt-4">
                                            <Link to="/" className="btn btn-outline-danger rounded-pill py-2 w-100 fw-semibold">
                                                <i className="bi bi-box-arrow-right me-1"></i> Logout
                                            </Link>
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