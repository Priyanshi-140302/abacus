import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/abacusLogo.png';
import { Link, useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;


const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [formErrors, setFormErrors] = useState({ username: '', password: '' });

    const handleInput = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        // Clear error on input
        setFormErrors(prev => ({
            ...prev,
            [e.target.name]: ''
        }));
    };


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const confirmLogout = window.confirm('You are already logged in. Do you want to logout?');
            if (confirmLogout) {
                sessionStorage.clear();
            } else {
                navigate('/home');
            }
        }
    }, []);

    const validate = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
        //  else if (!/\S+@\S+\.\S+/.test(formData.username)) {
        //     errors.username = 'Enter a valid email address';
        // }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        // else if (formData.password.length < 6) {
        //     errors.password = 'Password must be at least 6 characters';
        // }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const bodyFormData = new FormData();
            bodyFormData.append('username', formData.username);
            bodyFormData.append('password', formData.password);

            const response = await fetch(`${URL}/studentLogin`, {
                method: 'POST',
                body: bodyFormData,
            });

            const data = await response.json();

            if (data.status == 'true') {
                alert('Login successful!');
                sessionStorage.setItem('token', data?.token);
                sessionStorage.setItem('data', JSON.stringify(data?.response?.user_data));
                sessionStorage.setItem('userId', JSON.stringify(data?.response?.user_data?.student_id));
                navigate('/home');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const togglePassword = (e) => {
        e.preventDefault();
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
                                                    name='username'
                                                    onChange={handleInput}
                                                    value={formData.username}
                                                    placeholder="Username"
                                                />
                                                {formErrors.username && (
                                                    <small className="text-danger">{formErrors.username}</small>
                                                )}
                                            </div>

                                            <div className="mb-4 position-relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control form-control-lg text-white bg-transparent border-0 border-bottom shadow-none rounded-0"
                                                    id="exampleInputPassword1"
                                                    name='password'
                                                    onChange={handleInput}
                                                    value={formData.password}
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
                                                {formErrors.password && (
                                                    <small className="text-danger">{formErrors.password}</small>
                                                )}
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

                                            <Link to="/home" className="btn btn-login btn-lg w-100 rounded-pill fw-semibold mb-4" onClick={handleSubmit}>
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
