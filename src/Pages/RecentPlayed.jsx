import React, { useEffect, useState } from 'react';
import axios from 'axios';
import checkGif from '../assets/images/checkGif.gif';
import crossGif from '../assets/images/crossGif.gif';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SoundWave from '../components/SoundWave';
const URL = import.meta.env.VITE_URL;

const RecentPlayed = () => {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null);
    const [activeCardId, setActiveCardId] = useState(null);
    const [voiceSettings, setVoiceSettings] = useState(null);
    const [submitted, setSubmitted] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [speechStates, setSpeechStates] = useState({});
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { id } = useParams();

    const updateSpeechState = (id, updates) => {
        setSpeechStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                ...updates
            }
        }));
    };

    const getData = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const bodyFormData = new FormData();
            bodyFormData.append('category_id', id);

            const response = await axios.post(`${URL}/listening-questions`,
                bodyFormData,
                {
                    params: { page: page },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setData(response.data);
                setTotalPages(response.data.total || 1);
            } else {
                console.error('Failed to fetch:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [page]);

    const fetchVoiceSettings = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch(`${URL}/get-voice-control`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const json = await res.json();
            if (json.status && json.data && json.data.length > 0) {
                setVoiceSettings(json.data[0]);
            } else {
                console.warn('Voice settings not available');
            }
        } catch (error) {
            console.error('Failed to load voice settings:', error);
        }
    };

    useEffect(() => {
        fetchVoiceSettings();
    }, []);




    // const numberToWords = (num) => {
    //     const words = [...Array(101).keys()].map(i => i.toString());
    //     return words[parseInt(num)] || num;
    // };

    // const preprocessMathExpression = (expression) => {
    //     const tokens = expression.split(/(\d+!|\d+|[+\-])/).filter(Boolean);
    //     let result = [];

    //     tokens.forEach(token => {
    //         token = token.trim();
    //         if (!token) return;

    //         if (/^\d+!$/.test(token)) {
    //             const number = token.slice(0, -1);
    //             result.push(numberToWords(number));
    //         } else if (/^\d+$/.test(token)) {
    //             result.push(numberToWords(token));
    //         } else if (token === '-') {
    //             result.push('minus');
    //         } else if (token === '+') {
    //             result.push('plus');
    //         }
    //     });

    //     if (result.length > 0) {
    //         result.push('that is');
    //         return result.join(' ').replace(/\s+/g, ' ');
    //     }
    //     return expression;
    // };




    const numberToWords = (num) => {
        const a = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
            'seventeen', 'eighteen', 'nineteen'
        ];
        const b = [
            '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];

        const numToWords = (n) => {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
            if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
            if (n < 1000000) return numToWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
            return n.toString(); // fallback for large numbers
        };

        return numToWords(Number(num));
    };

    const preprocessMathExpression = (expression) => {
        const tokens = expression.split(/([0-9,]+!|[0-9,]+|[+\-])/).filter(Boolean);
        let result = [];

        let prevIsNumber = false;

        tokens.forEach(token => {
            token = token.trim();
            if (!token) return;

            // Factorial
            if (/^\d{1,3}(,\d{3})*!$/.test(token)) {
                const number = token.slice(0, -1).replace(/,/g, '');
                if (prevIsNumber) result.push('plus');
                result.push(numberToWords(number));
                prevIsNumber = true;
            }
            // Comma numbers
            else if (/^\d{1,3}(,\d{3})*$/.test(token)) {
                const number = token.replace(/,/g, '');
                if (prevIsNumber) result.push('plus');
                result.push(numberToWords(number));
                prevIsNumber = true;
            }
            // Plain number
            else if (/^\d+$/.test(token)) {
                if (prevIsNumber) result.push('plus');
                result.push(numberToWords(token));
                prevIsNumber = true;
            }
            // Operators
            else if (token === '+' || token === '-') {
                result.push(token === '+' ? 'plus' : 'minus');
                prevIsNumber = false;
            }
        });

        if (result.length > 0) {
            result.push('that is');
            return result.join(' ').replace(/\s+/g, ' ');
        }

        return expression;
    };



    const speakText = (text, id) => {
        const speakNow = () => {
            const processedText = preprocessMathExpression(text) || text;
            console.log("Speaking:", processedText);
            const utterance = new SpeechSynthesisUtterance(processedText);
            utterance.lang = 'en-IN';

            const voices = window.speechSynthesis.getVoices();
            const selectedVoice = voices.find(v =>
                v.name === voiceSettings?.voice_language || v.name === 'Google UK English Female'
            );
            if (selectedVoice) utterance.voice = selectedVoice;

            utterance.rate = voiceSettings?.voice_rate || 1;
            utterance.pitch = voiceSettings?.voice_pitch || 1;
            utterance.volume = voiceSettings?.voice_volume || 1;

            utterance.onend = () => updateSpeechState(id, { isSpeaking: false, isPaused: false });
            utterance.onerror = () => updateSpeechState(id, { isSpeaking: false, isPaused: false });

            updateSpeechState(id, { isSpeaking: true, isPaused: false });

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                speakNow();
                window.speechSynthesis.onvoiceschanged = null;
            };
        } else {
            speakNow();
        }
    };

    const handleOpen = (question) => {
        setCurrentQuestion(question);
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
        if (!answer) {
            const emptyAlert = document.querySelector("#emptyAlert");
            emptyAlert.innerHTML = `<h6 class="text-danger">Please enter a value in the Answer field.</h6>`;
            return;
        }
        if (!currentQuestion) return;

        const userAnswer = answer.trim();
        const correctAnswer = currentQuestion.answer?.trim();

        setSubmitted(prev => ({
            ...prev,
            [currentQuestion.id]: true
        }));

        if (userAnswer === correctAnswer) {
            setResult('correct');
        } else {
            setResult('wrong');
        }
    };

    const handleReattempt = () => {
        setAnswer('');
        setResult(null);
        setShow(false);
        if (currentQuestion) {
            speakText(currentQuestion.question, currentQuestion.id);
        }
    };

    return (
        <>
            <div className="main-container bg-theme">
                <Header data={{ title: '', detail: id, description: '' }} />
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-4">
                            {data?.data?.map((item, index) => {
                                const isActive = item.id === activeCardId;
                                const handleReady = () => speakText("Ready", item.id);
                                const handleQuestion = () => speakText(item.question, item.id);
                                const handleStop = () => {
                                    window.speechSynthesis.pause();
                                    updateSpeechState(item.id, { isPaused: true, isSpeaking: false });
                                };
                                const cardActive = () => {
                                    if (!isActive) {
                                        handleReady();
                                    }
                                    setActiveCardId(item.id);
                                }

                                return (
                                    <div key={item.id} className="col-12 col-md-6 col-xl-4 mb-3">
                                        <div
                                            className={`card border-0 rounded-4 shadow-sm ${submitted[item.id]
                                                ? 'border-success border-2'
                                                : isActive
                                                    ? 'border-1DE2CF border-2'
                                                    : 'border-white'
                                                }`}
                                            onClick={cardActive}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {submitted[item.id] && (
                                                <span className="badge bg-success position-absolute top-0 end-0 m-2">✔ Answered</span>
                                            )}
                                            <div className="card-body p-2">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : {index + 1}</h6>
                                                    <div className={`${isActive ? 'd-block' : 'd-none'}`}>
                                                        {!submitted[item.id] && (
                                                            <SoundWave />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                    <button className="btn btn-yellow rounded-pill fs-20 mb-2" onClick={handleReady} disabled={!isActive}>Ready</button>
                                                    <button className="btn btn-purple rounded-pill fs-20 mb-2" onClick={handleQuestion} disabled={!isActive}>Question</button>
                                                    <button className="btn btn-green rounded-pill fs-20 mb-2" onClick={() => handleOpen(item)} disabled={!isActive}>Answer</button>
                                                    <button className="btn btn-pink rounded-pill fs-20 mb-2" onClick={handleStop} disabled={!isActive}>Stop</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="d-flex justify-content-center align-items-center py-4 pagination-wrapper">
                            <button className="pagination-btn mx-2" disabled={page === 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
                                <i className="fa-solid fa-angles-left"></i>
                            </button>
                            <span className="page-info fs-5 mx-3">Page <strong>{page}</strong> of {totalPages}</span>
                            <button className="pagination-btn mx-2" disabled={page === totalPages} onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}>
                                <i className="fa-solid fa-angles-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between align-items-start">
                            {result === null && <h6 className="fw-semibold fs-22">Your answer</h6>}
                            <button className="btn-close ms-auto" onClick={handleClose}></button>
                        </div>

                        {result === null && (
                            <>
                                <input
                                    type="number"
                                    className="form-control answer-input mt-3 mb-2"
                                    placeholder="Type your answer"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                                <span id="emptyAlert"></span>
                                <button className="btn btn-submit w-100 mt-4" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </>
                        )}

                        {result === 'correct' && (
                            <div className="text-center">
                                <img src={checkGif} alt="" className="w-75 mb-2" />
                                <h2 className="text-0FB1A1 fw-bold mb-4">Your Answer is Correct</h2>
                                <button className="btn btn-submit w-100" onClick={handleClose}>
                                    Continue to next question
                                </button>
                            </div>
                        )}

                        {result === 'wrong' && (
                            <div className="text-center">
                                <img src={crossGif} alt="" className="w-75 mb-2" />
                                <h2 className="fw-bold mb-4">
                                    <span className="text-F81355">Correct Answer is </span>
                                    <span className="text-0FB1A1">{currentQuestion?.answer}</span>
                                </h2>
                                <button className="btn btn-submit w-100 mb-3" onClick={handleReattempt}>
                                    Re-attempt this
                                </button>
                                <button className="btn btn-green rounded-pill w-100 fs-20" style={{ padding: "12px 0" }} onClick={handleClose}>
                                    Next Question
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default RecentPlayed;
