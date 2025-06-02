import React, { useState } from 'react';
import Logo from '../assets/images/abacusLogo.png';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = (e) => {
        e.preventDefault(); // prevent form submit on button click
        setShowPassword(prev => !prev);
    };

    return (
        <>
            <div className="main-container login-page">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
                                <div className="text-center">
                                    <img src={Logo} alt="Logo" className="my-5" />
                                    <h1 className="text-white mb-5">Login</h1>
                                    <div className="text-start">
                                        <form>
                                            <div className="mb-4">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg text-white bg-transparent border-0 border-bottom shadow-none rounded-0"
                                                    id="exampleInputEmail1"
                                                    placeholder="Username"
                                                />
                                            </div>

                                            <div className="mb-4 position-relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control form-control-lg text-white bg-transparent border-0 border-bottom shadow-none rounded-0"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password"
                                                />
                                                <button
                                                    type="button"
                                                    className="border-0 bg-transparent position-absolute top-0 end-0"
                                                    onClick={togglePassword}
                                                >
                                                    {showPassword ? (
                                                        <i className="fa-regular fa-eye-slash text-white" style={{ margin: '15px' }}></i>
                                                    ) : (
                                                        <i className="fa-regular fa-eye text-white" style={{ margin: '15px' }}></i>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="mb-5 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input border-2 border-danger shadow-none me-2"
                                                    id="exampleCheck1"
                                                />
                                                <label className="form-check-label text-white fs-5" htmlFor="exampleCheck1">
                                                    Remember me
                                                </label>
                                            </div>

                                            <Link to="/home" className="btn btn-login btn-lg w-100 rounded-pill fw-semibold mb-4">
                                                Log in
                                            </Link>

                                            <Link to="/home" className="py-2 fw-semibold  mx-auto fw-normal text-decoration-none">
                                                <h5 className="text-white text-center">Forgot Password?</h5>
                                            </Link>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
