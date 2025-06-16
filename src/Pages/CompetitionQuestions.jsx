import { useEffect, useState, useRef } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebase";
import tandcIcon from '../assets/images/t&cIcon.png';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
const URL = import.meta.env.VITE_URL;

const CompetitionQuestions = () => {
    const [examStarted, setExamStarted] = useState(false);
    const [records, setRecords] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const navigate = useNavigate()
    const [disqualified, setDisqualified] = useState({});
    const [submitted, setSubmitted] = useState({});
    const [timerDuration, setTimerDuration] = useState(null); // in seconds
    const [countdowns, setCountdowns] = useState({});
    const timersRef = useRef({});


    useEffect(() => {
        const dbRef = ref(database, 'users');
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const formatted = Object.entries(data).map(([id, value]) => ({ id, ...value }));

                setRecords(prevRecords => {
                    // Check for changes in question_id for same id
                    formatted.forEach(newItem => {
                        const oldItem = prevRecords.find(r => r.id === newItem.id);
                        if (oldItem && oldItem.question_id !== newItem.question_id) {
                            // reset local states for new question
                            setUserAnswers(prev => ({ ...prev, [newItem.id]: "" }));
                            setSubmitted(prev => ({ ...prev, [newItem.id]: false }));
                            setFeedback(prev => ({ ...prev, [newItem.id]: "" }));
                            setDisqualified(prev => ({ ...prev, [newItem.id]: false }));
                            setCountdowns(prev => ({ ...prev, [newItem.id]: timerDuration }));

                        }
                    });
                    return formatted;
                });
            } else {
                setRecords([]);
            }
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const settingsRef = ref(database, 'questions/settings');
        onValue(settingsRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.perquestion_time) {
                setTimerDuration(parseInt(data.perquestion_time, 10)); // convert to number (seconds)
            }
        });
    }, []);


    useEffect(() => {
        if (!examStarted || !timerDuration) return;

        records.forEach((item) => {
            const isAnswerBox = item.isAnswerBox; // 🟡 define your condition

            if (
                isAnswerBox &&
                !submitted[item.id] &&
                !disqualified[item.id] &&
                !timersRef.current[item.id] // only start if not already running
            ) {

                setCountdowns(prev => ({ ...prev, [item.id]: timerDuration }));

                timersRef.current[item.id] = setInterval(() => {
                    setCountdowns(prev => {
                        const updated = { ...prev };
                        if (updated[item.id] > 0) {
                            updated[item.id] -= 1;
                        } else {
                            clearInterval(timersRef.current[item.id]);
                            delete timersRef.current[item.id];
                            setDisqualified(d => ({ ...d, [item.id]: true }));
                            setFeedback(f => ({
                                ...f,
                                [item.id]: "⏱️ Time's up! You are disqualified."
                            }));
                            markUserDisqualified();
                            alert("⏱️ Time's up! You are disqualified.");
                            navigate(-1);
                        }
                        return updated;
                    });
                }, 1000);
            }
        });

        return () => {
            Object.values(timersRef.current).forEach(clearInterval);
            timersRef.current = {};
        };
    }, [examStarted, records, timerDuration, submitted, disqualified]);






    const handleInputChange = (e, id) => {
        setUserAnswers(prev => ({ ...prev, [id]: e.target.value }));
    };

    const handleSubmit = async (id, correctAnswer, questionId, questionType) => {
        const userAnswer = userAnswers[id];

        const isCorrect = parseInt(userAnswer, 10) === correctAnswer;

        try {
            const formData = new FormData();
            formData.append("question_id", questionId);
            formData.append("answer", userAnswer);
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${URL}/save-answer-listening`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to submit answer to server.");
            }

            // Mark question as submitted (disable button)
            setSubmitted(prev => ({ ...prev, [id]: true }));

            if (isCorrect || questionType == 'trial') {
                setFeedback(prev => ({
                    ...prev,
                    [id]: "✅ Correct! Your answer was submitted successfully."
                }));

                setSubmitted(prev => ({ ...prev, [id]: true }));
                if (timersRef.current[id]) {
                    clearInterval(timersRef.current[id]);
                }

            } else {
                setFeedback(prev => ({
                    ...prev,
                    [id]: "❌ Your answer is wrong. You are not eligible for the next question."
                }));
                setDisqualified(prev => ({ ...prev, [id]: true }));
                markUserDisqualified();
                alert("❌ Your answer is wrong. You are not eligible for the next question.")
                navigate(-1)
            }
        } catch (error) {
            setFeedback(prev => ({
                ...prev,
                [id]: "❌ Error submitting answer: " + error.message,
            }));
        }
    };

    const handleStartExam = () => {
        setExamStarted(true);
    };

    const markUserDisqualified = () => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) return;

        const userRef = ref(database, `disqualifiedUsers/${userId}`);
        update(userRef, { status: 'disqualified' });
    };


    return (
        <div className="main-container bg-theme trialQuestion-page">
            <Header data={{ title: '', detail: 'Competition Questions', description: '' }} />
            <div className="container-fluid bg-white">
                <div className="container">
                    <div className="d-flex align-items-center py-2">
                        <img src={tandcIcon} alt="" className="me-2" />
                        <h6 className="mb-0 fw-semibold text-000000 fs-18">Competition Questions</h6>
                    </div>
                </div>
            </div>

            {!examStarted ? (
                <div className="container my-5 text-center">
                    <h3>Click the button below to start your exam</h3>
                    <button className="btn btn-submit mt-3 p-2" onClick={handleStartExam}>Start Exam</button>
                </div>

            ) : (
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-4">
                            {records.map((item) => (
                                item.isQuestionReady ? (
                                    <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mx-auto mb-3" key={item.id}>
                                        <div className="p-3 border rounded bg-light">
                                            <h5>Question ID: {item.question_id}</h5>
                                            {/* <h5>Answer: {item.answer}</h5> */}

                                            {/* {countdowns[item.id] !== undefined && (
                                                <div className="mb-2 text-danger">
                                                    ⏳ Time left: {countdowns[item.id]}s
                                                </div>
                                            )} */}


                                            {item.isQuestionReady ? (
                                                <div className="card bg-FFEA9F border-0 rounded-3 shadow-sm mb-3">
                                                    <div className="card-body p-3">
                                                        <>
                                                            {/* <p><strong>Q:</strong> {item.question}</p> */}

                                                            <input
                                                                type="number"
                                                                className="form-control mb-2"
                                                                value={userAnswers[item.id] || ''}
                                                                onChange={(e) => handleInputChange(e, item.id)}
                                                                placeholder="Enter your answer"
                                                                disabled={!!submitted[item.id]}
                                                            />
                                                            {item.isAnswerBox ? <button
                                                                className="btn btn-submit rounded-pill w-100"
                                                                onClick={() => handleSubmit(item.id, item.answer, item.question_id, item.questionType)}
                                                                disabled={!!submitted[item.id]}
                                                            >
                                                                Submit
                                                            </button> : ''}



                                                            {feedback[item.id] && (
                                                                <div className="mt-2">
                                                                    <span>{feedback[item.id]}</span>
                                                                </div>
                                                            )}


                                                        </>
                                                    </div>
                                                    {/* {JSON.stringify(item)} */}
                                                </div>
                                            ) : (
                                                <p className="text-muted">Question will be shown soon...</p>
                                            )}

                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompetitionQuestions;
