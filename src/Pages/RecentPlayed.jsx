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
    const [canAnswer, setCanAnswer] = useState({});

    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [speechState, setSpeechState] = useState({});
    const { id } = useParams();

    const updateSpeechState = (id, updates) => {
        setSpeechState(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                ...updates
            }
        }));
    };


    // const getData = async () => {
    //     try {
    //         const token = sessionStorage.getItem('token');
    //         const bodyFormData = new FormData();
    //         bodyFormData.append('category_id', id);

    //         const response = await axios.post(`${URL}/listening-questions`,
    //             bodyFormData,
    //             {
    //                 params: { page: page },
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         if (response.status === 200) {
    //             setData(response.data);
    //             setTotalPages(response.data.total || 1);
    //         } else {
    //             console.error('Failed to fetch:', response.status);
    //         }
    //     } catch (error) {
    //         if (error.response?.status === 401) {
    //             alert("Already Login in other device");
    //             sessionStorage.removeItem("token");
    //             window.location.href = "/listening/"; // or your login route
    //         } else {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    // };


    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
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
                const cacheKey = `shuffledPage_${id}_${page}`;
                const cachedData = sessionStorage.getItem(cacheKey);

                if (cachedData) {
                    setData({ ...response.data, data: JSON.parse(cachedData) });
                } else {
                    const shuffledData = shuffleArray(response.data.data);
                    sessionStorage.setItem(cacheKey, JSON.stringify(shuffledData));
                    setData({ ...response.data, data: shuffledData });
                }

                setTotalPages(response.data.total || 1);
            } else {
                console.error('Failed to fetch:', response.status);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Already logged in on another device");
                sessionStorage.clear(); // ⬅️ also clear shuffled pages
                window.location.href = "/listening/";
            } else {
                console.error('Error fetching data:', error);
            }
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



    const numberToIndianWords = (num) => {
        num = parseInt(num);
        if (isNaN(num)) return '';
        const a = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
            'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];
        const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        const inWords = (num) => {
            if (num < 20) return a[num];
            if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
            if (num < 1000) return a[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' ' + inWords(num % 100) : '');
            if (num < 100000) return inWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + inWords(num % 1000) : '');
            if (num < 10000000) return inWords(Math.floor(num / 100000)) + ' lakh' + (num % 100000 ? ' ' + inWords(num % 100000) : '');
            return inWords(Math.floor(num / 10000000)) + ' crore' + (num % 10000000 ? ' ' + inWords(num % 10000000) : '');
        };

        return inWords(parseInt(num)).trim();
    };



    const convertTextWithIndianNumbersOnly = (text) => {
        return text.replace(/(\d{1,3}(?:,\d{3})+)!?|(\d+)!|(\d+)|([+\-*/=])/g, (match, bigCommaNum, factorial, plainNum, operator) => {
            if (bigCommaNum) {
                const number = parseInt(bigCommaNum.replace(/,/g, ''));
                return numberToIndianWords(number) + ', ';

            } else if (factorial) {
                return match; // keep 2! as-is
            } else if (plainNum) {
                return numberToIndianWords(Number(plainNum)) + ', ';

            } else if (operator) {
                switch (operator) {
                    case '+': return 'plus';
                    case '-': return 'minus';
                    case '*': return 'times';
                    case '/': return 'divided by';
                    case '=': return 'equals';
                    default: return operator;
                }
            }
            return match;
        });
    };


    const speakChunks = (chunks, id, index = 0) => {
        if (index >= chunks.length) {
            updateSpeechState(id, { isSpeaking: false, isPaused: false });
            setCanAnswer(prev => ({ ...prev, [id]: true }));  // ✅ enable answer
            return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        utterance.lang = 'en-US';
        utterance.rate = voiceSettings?.voice_rate || 0.9;
        utterance.pitch = voiceSettings?.voice_pitch || 1;
        utterance.volume = voiceSettings?.voice_volume || 1;

        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.name.includes("Google US English"));
        if (selectedVoice) utterance.voice = selectedVoice;

        utterance.onend = () => {
            setTimeout(() => speakChunks(chunks, id, index + 1), 150); // add pause of 150ms
        };

        window.speechSynthesis.speak(utterance);
    };

    const speakText = (text, id, shouldAppend = true) => {
        const cleanText = convertTextWithIndianNumbersOnly(text);
        const finalText = shouldAppend ? `${cleanText} that is` : cleanText;

        // Split into phrases based on punctuation or where numbers occur
        const chunks = finalText.split(/(?<=[.,;!?])\s+|(?=\d{1,2}\s[a-z])/g).map(chunk => chunk.trim()).filter(Boolean);

        window.speechSynthesis.cancel();
        updateSpeechState(id, { isSpeaking: true, isPaused: false });
        setCanAnswer(prev => ({ ...prev, [id]: false }));  // 🔒 disable before speech
        if (window.speechSynthesis.getVoices().length > 0) {
            speakChunks(chunks, id);
        } else {
            window.speechSynthesis.onvoiceschanged = () => speakChunks(chunks, id);
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

        setSubmitted(prev => {
            const updated = {
                ...prev,
                [currentQuestion.id]: userAnswer === correctAnswer ? 'correct' : 'wrong'
            };

            sessionStorage.setItem('submittedAnswers', JSON.stringify(updated));
            return updated;
        });



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

    useEffect(() => {
        const stored = sessionStorage.getItem('submittedAnswers');
        if (stored) {
            setSubmitted(JSON.parse(stored));
        }
    }, []);


    return (
        <>
            <div className="main-container bg-theme">
                <Header data={{ title: '', detail: id, description: '' }} />
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-4">
                            {data?.data?.map((item, index) => {
                                const isActive = item.id === activeCardId;
                                const handleReady = () => speakText("Ready", item.id, false); // ✅ correct

                                const handleQuestion = () => speakText(item.question, item.id);
                                const handleStop = () => {
                                    window.speechSynthesis.pause();
                                    updateSpeechState(item.id, { isPaused: true, isSpeaking: false });
                                };
                                const cardActive = () => {
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

                                            {submitted[item.id] === 'correct' && (
                                                <span className="badge bg-success position-absolute top-0 end-0 m-2">✔ Answered</span>
                                            )}
                                            {submitted[item.id] === 'wrong' && (
                                                <span className="badge bg-danger position-absolute top-0 end-0 m-2">✔ Answered</span>
                                            )}

                                            <div className="card-body p-2">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : {(page - 1) * 10 + index + 1}</h6>
                                                    <div className={`${isActive ? 'd-block' : 'd-none'}`}>
                                                        {!submitted[item.id] && (
                                                            <SoundWave />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                    <button className="btn btn-yellow rounded-pill fs-20 mb-2" onClick={handleReady} disabled={!isActive}>Ready</button>
                                                    <button className="btn btn-purple rounded-pill fs-20 mb-2" onClick={handleQuestion} disabled={!isActive}>Question</button>

                                                    <button
                                                        className="btn btn-green rounded-pill fs-20 mb-2"
                                                        onClick={() => handleOpen(item)}
                                                        disabled={!isActive || !canAnswer[item.id]} // ✅ disable until question read
                                                    >
                                                        Answer
                                                    </button>

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
