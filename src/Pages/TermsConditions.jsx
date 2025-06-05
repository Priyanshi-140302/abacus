import React from 'react'

import tandcIcon from '../assets/images/t&cIcon.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TermsConditions = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="main-container bg-theme termAndCondition-page">
                 <Header data={{ title: '', detail: 'Competition Questions', description: '' }} />
                <div className="container-fluid bg-white">
                    <div className="container">
                        <div className="d-flex align-items-center py-2">
                            <img src={tandcIcon} alt="" className="me-2" />
                            <h5 className="mb-0 fw-semibold text-000000 fs-18">Terms & Conditions Before Starting the Exam</h5>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container">
                        <div className="py-3">
                            <h6 className="fs-18">
                                <span className="fw-bolder">1. Timing Rules</span>
                                <ul className='ps-4 mb-0'>
                                    <li className="">Once the exam starts, the timer will not pause.</li>
                                    <li className="">Submissions after the time ends will not be accepted.</li>
                                </ul>
                            </h6>
                            <h6 className="fs-18">
                                <span className="fw-bolder">2. One Attempt Only</span>
                                <ul className='ps-4 mb-0'>
                                    <li className="">Each user is allowed only one attempt per exam.</li>
                                    <li className="">Re-attempts are not permitted.</li>
                                </ul>
                            </h6>
                            <h6 className="fs-18">
                                <span className="fw-bolder">3. No External Help</span>
                                <ul className='ps-4 mb-0'>
                                    <li className="">Use of any external materials, websites, books, or help from others is strictly prohibited.</li>
                                    <li className="">Any such behavior may result in disqualification.</li>
                                </ul>
                            </h6>
                            <h6 className="fs-18">
                                <span className="fw-bolder">4. Stable Internet Required</span>
                                <ul className='ps-4 mb-0'>
                                    <li className="">Ensure a stable internet connection throughout the exam.</li>
                                    <li className="">We are not responsible for disconnections or data loss due to network issues.</li>
                                </ul>
                            </h6>
                            <h6 className="fs-18">
                                <span className="fw-bolder">5. Camera & Microphone Access (if applicable)</span>
                                <ul className='ps-4 mb-0'>
                                    <li className="">You may be required to give access to your camera and/or microphone for monitoring purposes.</li>
                                </ul>
                            </h6>
                            <h6 className="fs-18">
                                <span className="fw-bolder">6. Auto-Submission</span>
                                <ul className='ps-4 mb-0'>
                                    <li className="">The test will be automatically submitted once the timer ends.</li>
                                    <li className="">The test will be automatically submitted once the timer ends.</li>
                                </ul>
                            </h6>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input border-2 shadow-none"
                                    id="exampleCheck1"
                                />
                                <label className="form-check-label text-000000 fs-18 fw-semibold" style={{ lineHeight: '18px' }} htmlFor="exampleCheck1">
                                    By clicking "I Agree", you confirm that you have read and accepted all the terms & conditions.
                                </label>
                            </div>
                            <Link to="/trial-questions" className="btn btn-agree w-100 rounded-pill fw-semibold">
                                I AGREE & START EXAM
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TermsConditions