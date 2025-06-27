import { useEffect, useState } from 'react'
import axios from 'axios';
import voiceFrequencyImg from '../assets/images/voiceFrequencyImg.png';
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

    const { id } = useParams()

    const [currentQuestion, setCurrentQuestion] = useState(null);

    const [speechStates, setSpeechStates] = useState({});
    const updateSpeechState = (id, updates) => {
        setSpeechStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                ...updates
            }
        }));
    };

    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // to store total pages

    const getData = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const bodyFormData = new FormData();
            bodyFormData.append('category_id', id);

            const response = await axios.post(`${URL}/listening-questions`,
                bodyFormData, // body
                {
                    params: { page: page }, // query param
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
    }, [page])



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
        if (!currentQuestion) return;

        const userAnswer = answer.trim();
        const correctAnswer = currentQuestion.answer?.trim();

        // Mark this question as answered
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
    };

    // const preprocessMathExpression = (expression) => {
    //     let result = '';
    //     let i = 0;
    //     let expectPlus = false;
    //     let lastTokenWasNumber = false;

    //     while (i < expression.length) {
    //         const char = expression[i];

    //         if (char === '-') {
    //             result += ' minus ';
    //             expectPlus = true;
    //             lastTokenWasNumber = false;
    //             i++;
    //         } else if (char === '+') {
    //             if (expectPlus && lastTokenWasNumber) {
    //                 result += ' plus ';
    //                 expectPlus = false; // Only take first `+` after number
    //             }
    //             i++; // Always skip `+` if not expected
    //         } else if (/\d/.test(char)) {
    //             let num = '';
    //             while (i < expression.length && /\d/.test(expression[i])) {
    //                 num += expression[i];
    //                 i++;
    //             }
    //             result += num + ' ';
    //             lastTokenWasNumber = true;
    //         } else {
    //             i++; // Skip unknown chars
    //         }
    //     }

    //     return result.trim().replace(/\s+/g, ' ');
    // };

    // const preprocessMathExpression = (expression) => {
    //     const tokens = expression.split(/(\d+!|\d+|[+\-])/).filter(Boolean);
    //     let result = [];

    //     tokens.forEach((token) => {
    //         token = token.trim();
    //         if (!token) return;

    //         if (/^\d+!$/.test(token)) {
    //             // Just return the number with "!" as-is (don't say "factorial")
    //             result.push(token);
    //         } else if (token === '+') {
    //             result.push('plus');
    //         } else if (token === '-') {
    //             result.push('minus');
    //         } else if (/^\d+$/.test(token)) {
    //             result.push(token);
    //         }
    //     });

    //     return result.join(' ').replace(/\s+/g, ' ');
    // };



    //     const preprocessMathExpression = (expression) => {
    //     const tokens = expression.split(/(\d+!|\d+|[+\-])/).filter(Boolean);
    //     let result = [];

    //     tokens.forEach((token) => {
    //         token = token.trim();
    //         if (!token) return;

    //         if (/^\d+!$/.test(token)) {
    //             result.push(token); // keep 75! etc.
    //         } else if (token === '-') {
    //             result.push('minus');
    //         } else if (token === '+') {
    //             // skip saying "plus"
    //         } else if (/^\d+$/.test(token)) {
    //             result.push(token); // plain number
    //         }
    //     });

    //     return result.join(' ').replace(/\s+/g, ' ');
    // };


    // const preprocessMathExpression = (expression) => {
    //     const tokens = expression.split(/(\d+!|\d+|[+\-])/).filter(Boolean);
    //     let result = [];

    //     tokens.forEach((token) => {
    //         token = token.trim();
    //         if (!token) return;

    //         if (/^0!$/.test(token)) {
    //             result.push('zero!'); // speak as "zero factorial"
    //         } else if (token === '0') {
    //             result.push('zero');
    //         } else if (/^\d+!$/.test(token)) {
    //             result.push(token); // keep as 5!, 11!, etc.
    //         } else if (token === '-') {
    //             result.push('minus');
    //         } else if (token === '+') {
    //             // skip "plus"
    //         } else if (/^\d+$/.test(token)) {
    //             result.push(token);
    //         }
    //     });

    //     return result.join(' ').replace(/\s+/g, ' ');
    // };


    const numberToWords = (num) => {
    const words = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two",
        "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven",
        "twenty eight", "twenty nine", "thirty", "thirty one", "thirty two", "thirty three",
        "thirty four", "thirty five", "thirty six", "thirty seven", "thirty eight",
        "thirty nine", "forty", "forty one", "forty two", "forty three", "forty four",
        "forty five", "forty six", "forty seven", "forty eight", "forty nine", "fifty",
        "fifty one", "fifty two", "fifty three", "fifty four", "fifty five", "fifty six",
        "fifty seven", "fifty eight", "fifty nine", "sixty", "sixty one", "sixty two",
        "sixty three", "sixty four", "sixty five", "sixty six", "sixty seven", "sixty eight",
        "sixty nine", "seventy", "seventy one", "seventy two", "seventy three", "seventy four",
        "seventy five", "seventy six", "seventy seven", "seventy eight", "seventy nine",
        "eighty", "eighty one", "eighty two", "eighty three", "eighty four", "eighty five",
        "eighty six", "eighty seven", "eighty eight", "eighty nine", "ninety", "ninety one",
        "ninety two", "ninety three", "ninety four", "ninety five", "ninety six", "ninety seven",
        "ninety eight", "ninety nine", "one hundred"
    ];
    return words[parseInt(num)] || num;
};

const preprocessMathExpression = (expression) => {
    const tokens = expression.split(/(\d+!|\d+|[+\-])/).filter(Boolean);
    let result = [];

    tokens.forEach(token => {
        token = token.trim();
        if (!token) return;

        if (/^\d+!$/.test(token)) {
            const number = token.slice(0, -1);
            result.push(numberToWords(number));
        } else if (/^\d+$/.test(token)) {
            result.push(numberToWords(token));
        } else if (token === '-') {
            result.push('minus');
        } else if (token === '+') {
            result.push('plus');
        }
    });

    // Append "that is" at the end
    result.push('that is');

    return result.join(' ').replace(/\s+/g, ' ');
};


    return (
        <>
            <div className="main-container bg-theme ">
                <Header data={{ title: '', detail: 'recent-played', description: '' }} />
                <div className="container-fluid">
                    <div className="container">


                        {/* {voiceSettings && (
                            <div className="card p-3 mt-3 mb-4 shadow-sm">
                                <h5 className="fw-semibold mb-3">Voice Settings</h5>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Rate: {voiceSettings.voice_rate}</label>
                                        <input type="range" min="0.1" max="2" step="0.1" value={voiceSettings.voice_rate} onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice_rate: parseFloat(e.target.value) }))} className="form-range" />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Pitch: {voiceSettings.voice_pitch}</label>
                                        <input type="range" min="0" max="2" step="0.1" value={voiceSettings.voice_pitch} onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice_pitch: parseFloat(e.target.value) }))} className="form-range" />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Volume: {voiceSettings.voice_volume}</label>
                                        <input type="range" min="0" max="1" step="0.1" value={voiceSettings.voice_volume} onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice_volume: parseFloat(e.target.value) }))} className="form-range" />
                                    </div>
                                </div>
                            </div>
                        )} */}

                        <div className="row py-4">

                            {data?.data?.map((item, index) => {
                                const state = speechStates[item.id] || { isPaused: false, isSpeaking: false };

                                const speakText = (text, id) => {
                                    const speakNow = () => {
                                        const processedText = preprocessMathExpression(text) || text;

                                        const utterance = new SpeechSynthesisUtterance(processedText);
                                        utterance.lang = 'en-IN';

                                        const voices = window.speechSynthesis.getVoices();
                                        const selectedVoice = voices.find(v => v.name === voiceSettings?.voice_language || v.lang === 'en-IN');
                                        if (selectedVoice) utterance.voice = selectedVoice;

                                        utterance.rate = voiceSettings?.voice_rate || 1;
                                        utterance.pitch = voiceSettings?.voice_pitch || 1;
                                        utterance.volume = voiceSettings?.voice_volume || 1;

                                        utterance.onend = () => updateSpeechState(id, { isSpeaking: false, isPaused: false });
                                        utterance.onerror = (e) => {
                                            updateSpeechState(id, { isSpeaking: false, isPaused: false });
                                        };

                                        updateSpeechState(id, { isSpeaking: true, isPaused: false });

                                        window.speechSynthesis.cancel(); // Cancel previous speech
                                        window.speechSynthesis.speak(utterance);
                                    };

                                    // If voices are not loaded yet, wait and retry
                                    const voices = window.speechSynthesis.getVoices();
                                    if (voices.length === 0) {
                                        window.speechSynthesis.onvoiceschanged = () => {
                                            speakNow();
                                            window.speechSynthesis.onvoiceschanged = null; // Prevent infinite loop
                                        };
                                    } else {
                                        speakNow();
                                    }
                                };


                                const handleReady = () => speakText('Ready');
                                const handleQuestion = () => speakText(item.question);
                                const handleStop = () => {
                                    window.speechSynthesis.pause();
                                    updateSpeechState(item.id, { isPaused: true, isSpeaking: false });
                                };

                                const isActive = item.id === activeCardId;

                                return (
                                    <div key={item.id} className="col-12 col-md-6 col-xl-4 mb-3">
                                        <div
                                            className={`card border-0 rounded-4 shadow-sm ${submitted[item.id]
                                                ? 'border-success border-2' // ✅ Green if answered
                                                : isActive
                                                    ? 'border-1DE2CF border-2' // Blue if active
                                                    : 'border-white'          // Default
                                                }`}
                                            onClick={() => setActiveCardId(item.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {submitted[item.id] && (
                                                <span className="badge bg-success position-absolute top-0 end-0 m-2">✔ Answered</span>
                                            )}
                                            <div className="card-body p-2">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="text-505050 fw-semibold mb-0 fs-20">Q. No : {index + 1}</h6>

                                                    <div className={`${isActive ? 'd-block' : 'd-none'}`}>
                                                        <SoundWave />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                    <button className="btn btn-yellow rounded-pill fs-20 mb-2" onClick={handleReady} disabled={!isActive} >Ready</button>
                                                    <button className="btn btn-purple rounded-pill fs-20 mb-2" onClick={handleQuestion} disabled={!isActive} >Question</button>
                                                    <button
                                                        className="btn btn-green rounded-pill fs-20 mb-2"
                                                        onClick={() => handleOpen(item)}
                                                        disabled={!isActive} >
                                                        Answer
                                                    </button>
                                                    <button className="btn btn-pink rounded-pill fs-20 mb-2" onClick={handleStop} disabled={!isActive} >Stop</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}


                        </div>


                        <div className="d-flex justify-content-center align-items-center py-4 pagination-wrapper">
                            <button
                                className="pagination-btn mx-2"
                                disabled={page === 1}
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            >
                                <i className="fa-solid fa-angles-left"></i>
                            </button>

                            <span className="page-info fs-5 mx-3">Page <strong>{page}</strong> of {totalPages}</span>

                            <button
                                className="pagination-btn mx-2"
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            >
                                <i className="fa-solid fa-angles-right"></i>
                            </button>
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
                                        <span className="text-0FB1A1">{currentQuestion?.answer}</span>
                                    </h2>

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


