import React from 'react'
import profile from '../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListeningPractice = () => {
    const navigate = useNavigate();

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
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                                        <h6 className="text-000000 fw-semibold mb-0 fs-22">1-2D10R</h6>
                                        <Link to='/recent-played' className="btn btn-pink rounded-pill fs-20">ENTER</Link>
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

export default ListeningPractice