import React, { useEffect, useState } from 'react'
import axios from 'axios';
import profile from '../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;

const ListeningPractice = () => {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const getData = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const response = await axios.get(`${URL}/listening-question-categories`, {
                params: { per_page: page }, // query param
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
            <div className="main-container bg-theme">
                <div className="container-fluid header">
                    <div className="container">
                        <div className="row py-3 bg-stars">
                            <div className="col-9 d-flex align-items-center">
                                <div className="d-flex align-items-center text-white fw-semibold">
                                    <h5 className="me-2 mb-0" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </h5>
                                    <h5 className="mb-0 fs-22">Listening Practice</h5>
                                </div>
                            </div>
                            <div className="col-3 text-end">
                                <img src={profile} alt="" className="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-4">

                            {data?.data?.map((val, index) => {
                                return (
                                    <>
                                        <div key={index} className="col-12 col-md-6 col-xl-4 mb-3">
                                            <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                                <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                                    <h6 className="text-000000 fw-semibold mb-0 fs-22">{val?.category_id}</h6>
                                                    <Link to={`/recent-played/${val?.category_id}`} className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListeningPractice