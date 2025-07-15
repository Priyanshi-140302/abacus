import React, { useEffect, useState } from 'react'
import axios from 'axios';
const URL = import.meta.env.VITE_URL;
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Header = ({ data }) => {
    const navigate = useNavigate();
    const [datas, setDatas] = useState('');

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
                sessionStorage.setItem("faceReferenceUrl", response.data.imagePath)
                setDatas(response.data); // Axios auto-parses JSON
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

    return (
        <div>
            <>
                <div className="container-fluid header">
                    <div className="container">
                        <div className="row py-1 bg-stars">
                            <div className="col-9 d-flex align-items-center p-0">
                                {data?.title == "" ?
                                    <button className="border-0 bg-transparent p-2 mt-2" onClick={() => navigate(-1)}>
                                        <i className="fa-solid fa-angle-left text-white fs-4"></i>
                                    </button>
                                    : ""
                                }
                                <div className="">
                                    <h5 className="text-white fw-semibold mb-1">{data?.title}</h5>
                                    <h4 className="text-white fw-bold mb-0">{data?.detail} </h4>
                                </div>
                            </div>
                            <div className="col-3 text-end">
                                <div className="dropdown">
                                    <button className="btn profile-btn dropdown-toggle border-0 rounded-circle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">


                                        <img src={datas.imagePath} alt="" className="rounded-circle" style={{ width: '55px', height: '55px' }} />
                                        <i className="fa-solid fa-angle-down text-white ms-2 fs-5"></i>
                                    </button>
                                    <ul className="dropdown-menu mt-4 me-4 border-0 shadow rounded-4 overflow-hidden">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <hr className='my-0 border-dark-subtle' />
                                        <li><Link className="dropdown-item" to="/">Logout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Header