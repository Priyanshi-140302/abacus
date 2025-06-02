import React, { useState } from 'react';
import profile from '../assets/images/profile.png';
import voiceFrequencyImg from '../assets/images/voiceFrequencyImg.png';
import checkGif from '../assets/images/checkGif.gif';
import crossGif from '../assets/images/crossGif.gif';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RecentPlayed = () => {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleOpen = () => {
        setShow(true);
        setAnswer('');
        setResult(null);
    };

    const handleClose = () => {
        setShow(false);
        setResult(null);
        setAnswer('');
    };

    const handleSubmit = () => {
        if (answer.trim() === '123') {
            setResult('correct');
        } else {
            setResult('wrong');
        }
    };

    const handleReattempt = () => {
        setAnswer('');
        setResult(null);
    };

    return (
        <>
            <div className="main-container bg-theme ">
                <div className="container-fluid header">
                    <div className="container">
                        <div className="row py-3 bg-stars">
                            <div className="col-9 d-flex align-items-center">
                                <div className="d-flex align-items-center text-white fw-semibold">
                                    <h5 className="me-2 mb-0" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </h5>
                                    <h6 className="mb-0 fs-22">Recent Played Q. No : 1</h6>
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
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 1</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 2</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 3</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 4</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 5</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 6</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 7</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 8</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 9</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4 mb-3">
                                <div className="card border-0 rounded-4 shadow-sm border-1DE2CF">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : 10</h6>
                                            <img src={voiceFrequencyImg} alt="" className="" />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <button className="btn btn-yellow rounded-pill fs-20 mb-2">Ready</button>
                                            <button className="btn btn-purple rounded-pill fs-20 mb-2">Question</button>
                                            <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={handleOpen}>Answer</button>
                                            <button className="btn btn-pink rounded-pill fs-20 mb-2">Stop</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/* Close Button */}
                        <div className="d-flex justify-content-between align-items-start">
                            {result === null && (
                                <h6 className="fw-semibold fs-22">Your answer</h6>
                            )}
                            <button className="btn-close ms-auto" onClick={handleClose}></button>
                        </div>

                        {/* Main Content */}
                        {result === null && (
                            <>
                                <input
                                    type="number"
                                    className="form-control answer-input mt-3"
                                    placeholder="Type your answer"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                                <button className="btn btn-submit w-100 mt-4" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </>
                        )}

                        {result === 'correct' && (
                            <>
                                <div className="text-center">
                                    <img src={checkGif} alt="" className="w-75 mb-2" />
                                    <h2 className="text-0FB1A1 fw-bold mb-4">Your Answer is Correct</h2>
                                    <button className="btn btn-submit w-100" onClick={handleClose}>
                                        Continue to next question
                                    </button>
                                </div>
                            </>
                        )}

                        {result === 'wrong' && (
                            <>
                                <div className="text-center">
                                    <img src={crossGif} alt="" className="w-75 mb-2" />
                                    <h2 className="fw-bold mb-4">
                                        <span className="text-F81355">Correct Answer is </span>
                                        <span className="text-0FB1A1">5000</span></h2>
                                    <div className="">
                                        <button className="btn btn-submit w-100 mb-3" onClick={handleReattempt}>
                                            Re-attempt this
                                        </button>
                                        <button className="btn btn-green rounded-pill w-100 fs-20"
                                            style={{ padding: "12px 0" }} onClick={handleClose}>
                                            Next Question
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default RecentPlayed