import React from 'react'
import { Link } from 'react-router-dom';
import profile from '../assets/images/profile.png';

const Header = ({ data }) => {
    return (
        <div>
            <>
                <div className="container-fluid header">
                    <div className="container">
                        <div className="row py-3 bg-stars">
                            <div className="col-9">
                                <h5 className="text-white fw-semibold mb-1">{data?.title}</h5>
                                <h4 className="text-white fw-bold mb-0">{data?.detail} </h4>
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
            </>
        </div>
    )
}

export default Header