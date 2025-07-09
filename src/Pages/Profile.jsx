import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;
import Header from '../components/Header';

const Profile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [status, setStatus] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);

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
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Login in other device");
                sessionStorage.removeItem("token");
                window.location.href = "/listening/"; // or your login route
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        getData();
    }, [])

    const handleUpload = async (file) => {
        const token = sessionStorage.getItem('token');
        const rawData = sessionStorage.getItem('data');
        const parsedData = rawData ? JSON.parse(rawData) : {};
        const student_id = parsedData?.student_id;


        console.log(student_id);

        if (!file || !student_id) return setStatus('❌ No file or ID.');

        setStatus('⏳ Uploading...');

        const formData = new FormData();
        formData.append('student_id', student_id);
        formData.append('image', file);

        try {
            const res = await fetch(`${URL}/listeningStudentChangeImage`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                const updatedDetail = {
                    ...parsedData,
                    imagePath: `${result.imagePath}?v=${Date.now()}`, // Add timestamp to force refresh
                };

                // Update React state and optionally sessionStorage
                setData(updatedDetail);
                sessionStorage.setItem('data', JSON.stringify(updatedDetail)); // optional
                setStatus('✅ Uploaded!');
                location.reload();

            }
            else {
                setStatus(`❌ Error: ${result.message || 'Upload failed'}`);
            }
        } catch (err) {
            console.error(err);
            setStatus('❌ Upload error.');
        }
    };

    return (
        <>
            <div className="main-container bg-theme profile-page">


                <Header data={{ title: '', detail: 'Profile', description: '' ,}} />
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
                                            <label htmlFor="username" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-person-fill text-primary me-1"></i> Username:
                                            </label>
                                            <h2 className="form-control fs-4 fw-bolder rounded-4">{data?.username || "N/A"}</h2>
                                        </div>

                                        {/* <div className="mb-3">
                                            <label htmlFor="studentId" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-hash text-primary me-1"></i> Student ID:
                                            </label>
                                            <div className="form-control">{data?.student_id || "N/A"}</div>
                                        </div> */}

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-person-lines-fill text-primary me-1"></i> Name:
                                            </label>
                                            <div className="form-control">{data?.name || "N/A"}</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="mobile" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-telephone-fill text-primary me-1"></i> Mobile:
                                            </label>
                                            <div className="form-control">{data?.mobile || "N/A"}</div>
                                        </div>

                                        {/* <div className="mb-3">
                                            <label htmlFor="altMobile" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-telephone-outbound-fill text-primary me-1"></i> Alternate Mobile:
                                            </label>
                                            <div className="form-control">{data?.alternate_mobile || "N/A"}</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="centreInstructor" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-person-badge text-primary me-1"></i> Centre Instructor:
                                            </label>
                                            <div className="form-control">{data?.centre_instructor || "N/A"}</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="groupName" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-people-fill text-primary me-1"></i> Group Name:
                                            </label>
                                            <div className="form-control">{data?.group_name || "N/A"}</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="levelName" className="form-label fw-semibold text-dark fs-5">
                                                <i className="bi bi-layers-fill text-primary me-1"></i> Level:
                                            </label>
                                            <div className="form-control">{data?.level_name || "N/A"}</div>
                                        </div> */}

                                        {/* Optional: Display user image if available */}
                                        {data?.imagePath && (
                                            <>
                                                {/* Image upload section */}
                                                <div className="mb-3 w-100 d-flex justify-content-between">
                                                    <img
                                                        src={data?.imagePath || "/default-avatar.png"}
                                                        alt="User"
                                                        className="img-fluid rounded-circle border"
                                                        style={{ width: "120px", height: '120px', cursor: 'pointer' }}
                                                        onClick={() => setPreviewOpen(true)}
                                                    />
                                                    <div className="">
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary rounded-pill"
                                                            onClick={() => document.getElementById('profileImageInput').click()} >
                                                            Update Image
                                                        </button>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    id="profileImageInput"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => handleUpload(e.target.files[0])}
                                                />


                                                {/* Modal for Image Preview */}
                                                {previewOpen && (
                                                    <div
                                                        className="modal d-block"
                                                        tabIndex="-1"
                                                        role="dialog"
                                                        style={{ background: 'rgba(0,0,0,0.6)' }}
                                                        onClick={() => setPreviewOpen(false)}
                                                    >
                                                        <div
                                                            className="modal-dialog modal-dialog-centered"
                                                            role="document"
                                                            onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
                                                        >
                                                            <div className="modal-content rounded-4 bg-transparent border-0 position-relative">
                                                                <div className="d-flex justify-content-end">
                                                                    <button
                                                                        className="btn btn-dark position-absolute top-0 end-0 m-2 bg-danger text-white border-0 rounded-circle"
                                                                        onClick={() => setPreviewOpen(false)}
                                                                        style={{ height: '35px', width: '35px' }}
                                                                    >
                                                                        <i className="fa-solid fa-xmark"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="text-center">
                                                                    <img
                                                                        src={data?.imagePath || "/default-avatar.png"}
                                                                        alt="Preview"
                                                                        className="img-fluid rounded-4"
                                                                        style={{ maxHeight: "400px", maxWidth: "100%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </>
                                        )}

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
                                            <input type="password" className="form-control shadow-none" id="newPassword1" placeholder="Enter password" />
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
