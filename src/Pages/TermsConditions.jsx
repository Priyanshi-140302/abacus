import React, { useState, useEffect } from 'react';
import tandcIcon from '../assets/images/t&cIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FaceRecognitionLogin from '../components/FaceRecogination';

const TermsConditions = () => {
    const [agreed, setAgreed] = useState(false);
    const [alreadyAgreed, setAlreadyAgreed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAgreement = sessionStorage.getItem('agreedToTerms');
        if (storedAgreement === 'true') {
            setAgreed(true);
            setAlreadyAgreed(true);
        }
    }, [navigate]);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setAgreed(isChecked);
        sessionStorage.setItem('agreedToTerms', isChecked.toString());
    };

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

                <FaceRecognitionLogin />
                <div className="container-fluid">
                    <div className="container">
                        <div className="py-3">

                            {/* Terms List */}
                            {[
                                {
                                    title: '1. Timing Rules',
                                    points: [
                                        'Once the exam starts, the timer will not pause.',
                                        'Submissions after the time ends will not be accepted.'
                                    ]
                                },
                                {
                                    title: '2. One Attempt Only',
                                    points: [
                                        'Each user is allowed only one attempt per exam.',
                                        'Re-attempts are not permitted.'
                                    ]
                                },
                                {
                                    title: '3. No External Help',
                                    points: [
                                        'Use of any external materials, websites, books, or help from others is strictly prohibited.',
                                        'Any such behavior may result in disqualification.'
                                    ]
                                },
                                {
                                    title: '4. Stable Internet Required',
                                    points: [
                                        'Ensure a stable internet connection throughout the exam.',
                                        'We are not responsible for disconnections or data loss due to network issues.'
                                    ]
                                },
                                {
                                    title: '5. Camera & Microphone Access (if applicable)',
                                    points: [
                                        'You may be required to give access to your camera and/or microphone for monitoring purposes.'
                                    ]
                                },
                                {
                                    title: '6. Auto-Submission',
                                    points: [
                                        'The test will be automatically submitted once the timer ends.',
                                        'The test will be automatically submitted once the timer ends.'
                                    ]
                                }
                            ].map((section, index) => (
                                <h6 className="fs-18" key={index}>
                                    <span className="fw-bolder">{section.title}</span>
                                    <ul className='ps-4 mb-0'>
                                        {section.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </h6>
                            ))}

                            {/* Agreement UI */}
                            {!alreadyAgreed && (
                                <>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input border-2 shadow-none"
                                            id="exampleCheck1"
                                            checked={agreed}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label
                                            className="form-check-label text-000000 fs-18 fw-semibold"
                                            style={{ lineHeight: '18px' }}
                                            htmlFor="exampleCheck1"
                                        >
                                            By clicking "I Agree", you confirm that you have read and accepted all the terms & conditions.
                                        </label>
                                    </div>

                                    <Link
                                        to={agreed ? "/competition-questions" : "#"}
                                        className={`btn btn-agree w-100 rounded-pill fw-semibold ${!agreed ? 'disabled' : ''}`}
                                        onClick={(e) => {
                                            if (!agreed) e.preventDefault();
                                        }}
                                    >
                                        I AGREE & START EXAM
                                    </Link>
                                </>
                            )}

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input border-2 shadow-none"
                                    id="exampleCheck1"
                                    checked={agreed}
                                    onChange={handleCheckboxChange}
                                />
                                <label
                                    className="form-check-label text-000000 fs-18 fw-semibold"
                                    style={{ lineHeight: '18px' }}
                                    htmlFor="exampleCheck1"
                                >
                                    By clicking "I Agree", you confirm that you have read and accepted all the terms & conditions.
                                </label>
                            </div>

                            <Link
                                to={agreed ? "/competition-questions" : "#"}
                                className={`btn btn-agree w-100 rounded-pill fw-semibold ${!agreed ? 'disabled' : ''}`}
                                onClick={(e) => {
                                    if (!agreed) e.preventDefault();
                                }}
                            >
                                I AGREE & START EXAM
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsConditions;
