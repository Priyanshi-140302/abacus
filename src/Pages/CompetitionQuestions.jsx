import React, { useState } from 'react';

import tandcIcon from '../assets/images/t&cIcon.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CompetitionQuestions = () => {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (answer.trim() === '123') {
            setResult('correct');
        } else {
            setResult('wrong');
        }
        setShow(true); // Show modal only for correct or wrong
    };

    const handleClose = () => {
        setShow(false);
        setResult(null);
        setAnswer('');
    };

    const handleReattempt = () => {
        setResult(null);
        setShow(false);
        setAnswer('');
    };

    return (
        <>
            <div className="main-container bg-theme trialQuestion-page">
               
                  <Header data={{ title: '', detail: 'Competition Questions', description: '' }} />
                <div className="container-fluid bg-white">
                    <div className="container">
                        <div className="d-flex align-items-center py-2">
                            <img src={tandcIcon} alt="" className="me-2" />
                            <h6 className="mb-0 fw-semibold text-000000 fs-18">Competition Questions </h6>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-4">
                            <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mx-auto mb-3">
                                <div className="card bg-FFEA9F border-0 rounded-3 shadow-sm mb-5">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-000000 fw-semibold mb-0 fs-20">Q. No :1</h6>
                                        </div>
                                        <div className="">
                                            <input
                                                type='number'
                                                className="form-control textArea border-0 shadow-none fs-14"
                                                placeholder="Type your answer"
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-submit rounded-pill w-100" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end align-items-start">
                            <button className="btn-close" onClick={handleClose}></button>
                        </div>

                        {result === 'correct' && (
                            <div className="text-center">
                                <h3 className="text-000000 fw-bold fs-32">Congratulations</h3>
                                <h3 className="text-0FB1A1 fw-bold mb-4 fs-28">Your Answer is Correct</h3>
                                <Link to='/trial-question' className="btn btn-submit w-100">
                                    Continue to next question
                                </Link>
                            </div>
                        )}

                        {result === 'wrong' && (
                            <div className="text-center">
                                <div className="mb-4">
                                    <h3 className="text-F81355 fw-bold fs-28">Your  Answer is : 40</h3>
                                    <h3 className="text-0FB1A1 fw-bold fs-28">Correct Answer is : 50</h3>
                                </div>
                                <div className="border-top pt-3">
                                    <h5 className="text-secondary fs-22">You are not eligible for the next question</h5>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default CompetitionQuestions