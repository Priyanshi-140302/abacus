import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import tandcIcon from '../assets/images/t&cIcon.png';
import checkGif from '../assets/images/checkGif.gif';
import crossGif from '../assets/images/crossGif.gif';
import Header from '../components/Header';

const URL = import.meta.env.VITE_URL;

const TrialQuestions = () => {
    const [examStarted, setExamStarted] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isTimeOver, setIsTimeOver] = useState(false);

    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ question_id: '254', answer: '' });
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const navigate = useNavigate();

    // Start countdown when exam begins
    useEffect(() => {
        if (examStarted && timer > 0 && !showModal) {
            const countdown = setTimeout(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(countdown);
        }

        if (timer === 0 && examStarted && !showModal) {
            setIsTimeOver(true);
            setShowModal(true);
        }
    }, [examStarted, timer, showModal]);

    const handleStartExam = () => {
        setExamStarted(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.answer.trim()) {
            alert('Please enter an answer');
            return;
        }

        try {
            const bodyFormData = new FormData();
            bodyFormData.append('question_id', formData.question_id);
            bodyFormData.append('answer', formData.answer);
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${URL}/save-answer-listening`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: bodyFormData,
            });

            const data = await response.json();

            if (data.status === true || data.status === 'true') {
                setResult('correct');
            } else {
                setResult('wrong');
                // setCorrectAnswer(data.correct_answer); // if available
            }

            setShowModal(true);
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setResult(null);
        setAnswer('');
        setFormData(prev => ({ ...prev, answer: '' }));
        setTimer(30);
        setIsTimeOver(false);
        setExamStarted(false); // reset for retry if allowed
    };

    return (
        <>
            <div className="main-container bg-theme trialQuestion-page">
                <Header data={{ title: '', detail: 'Competition Questions', description: '' }} />

                <div className="container-fluid bg-white">
                    <div className="container">
                        <div className="d-flex align-items-center py-2">
                            <img src={tandcIcon} alt="" className="me-2" />
                            <h6 className="mb-0 fw-semibold text-000000 fs-18">Trial Questions</h6>
                        </div>
                    </div>
                </div>

                {!examStarted ? (<>
                    <div className="container my-5 text-center">
                        <h3>Click the button below to start your exam</h3>
                        <button className="btn btn-submit mt-3 p-2" onClick={handleStartExam}>Start Trial Exam</button>
                    </div>
                    <div className="container my-5 text-center">
                        <h3>start your exam</h3>
                        <Link to='/competition-questions' className="btn btn-submit mt-3 p-2" >Start Exam</Link>
                    </div></>
                ) : (
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row py-4">
                                <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mx-auto mb-3">
                                    <div className="card bg-FFEA9F border-0 rounded-3 shadow-sm mb-3">
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h6 className="text-000000 fw-semibold mb-0 fs-20">Q. No : 1</h6>
                                                <span className="badge bg-danger fs-16">Time Left: {timer}s</span>
                                            </div>

                                            <input
                                                type='number'
                                                className="form-control textArea border-0 shadow-none"
                                                placeholder="Type your answer"
                                                value={formData.answer}
                                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                                disabled={isTimeOver}
                                            />
                                        </div>
                                    </div>
                                    <button className="btn btn-submit rounded-pill w-100"
                                        onClick={handleSubmit}
                                        disabled={isTimeOver || showModal}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end align-items-start">
                            <button className="btn-close" onClick={handleClose}></button>
                        </div>

                        {isTimeOver && (
                            <div className="text-center">
                                <img src={crossGif} alt="Time Over" className="w-75 mb-2" />
                                <h2 className="text-F81355 fw-bold fs-28">Time is up!</h2>
                                <p className="fs-20">You didn't answer in time.</p>
                            </div>
                        )}

                        {!isTimeOver && result === 'correct' && (
                            <div className="text-center">
                                <img src={checkGif} alt="Correct" className="w-75 mb-2" />
                                <h2 className="text-000000 fw-bold fs-32">Congratulations</h2>
                                <h3 className="text-0FB1A1 fw-bold mb-4 fs-28">Your Answer is Correct</h3>
                                <Link to='/trial-question' className="btn btn-submit w-100">
                                    Continue to next question
                                </Link>
                            </div>
                        )}

                        {!isTimeOver && result === 'wrong' && (
                            <div className="text-center">
                                <img src={crossGif} alt="Wrong" className="w-75 mb-2" />
                                <div className="mb-4">
                                    <h3 className="text-F81355 fw-bold fs-28">Your Answer is: {formData.answer}</h3>
                                    <h3 className="text-0FB1A1 fw-bold fs-28">Correct Answer is: {correctAnswer ?? 'Unknown'}</h3>
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
    );
};

export default TrialQuestions;
