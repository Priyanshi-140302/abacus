import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
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
            } else {
                setFeedback(prev => ({
                    ...prev,
                    [id]: "❌ Your answer is wrong. You are not eligible for the next question."
                }));
                setDisqualified(prev => ({ ...prev, [id]: true }));
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
                                            <h5>Answer: {item.answer}</h5>

                                            {item.isAnswerBox ? (
                                                <div className="card bg-FFEA9F border-0 rounded-3 shadow-sm mb-3">
                                                    <div className="card-body p-3">
                                                        <>
                                                            <p><strong>Q:</strong> {item.question}</p>

                                                            <input
                                                                type="number"
                                                                className="form-control mb-2"
                                                                value={userAnswers[item.id] || ''}
                                                                onChange={(e) => handleInputChange(e, item.id)}
                                                                placeholder="Enter your answer"
                                                                disabled={!!submitted[item.id]}
                                                            />

                                                            <button
                                                                className="btn btn-submit rounded-pill w-100"
                                                                onClick={() => handleSubmit(item.id, item.answer, item.question_id, item.questionType)}
                                                                disabled={!!submitted[item.id]}
                                                            >
                                                                Submit
                                                            </button>


                                                            {feedback[item.id] && (
                                                                <div className="mt-2">
                                                                    <span>{feedback[item.id]}</span>
                                                                </div>
                                                            )}


                                                        </>
                                                    </div>
                                                    {JSON.stringify(item)}
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
