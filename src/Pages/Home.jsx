import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { ref, onChildChanged, onValue } from "firebase/database";

import { database } from "../firebase";
import Logo from '../assets/images/abacusLogo.png';
import checkGif from '../assets/images/checkGif.gif';
import crossGif from '../assets/images/crossGif.gif';

const Home = () => {

    const [examStarted, setExamStarted] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [alertData, setAlertData] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [captured, setCaptured] = useState(null);
    const [status, setStatus] = useState('');
    const videoRef = useRef(null);
    const data = sessionStorage.getItem('data');
    const detail = JSON.parse(data);
    const student_id = detail?.student_id;
    const token = sessionStorage.getItem('token');
    const API_URL = import.meta.env.VITE_URL;
    const [cameraActive, setCameraActive] = useState(false);

    useEffect(() => {
        const settingsRef = ref(database, 'questions/settings');

        // 1. Initial fetch of current settings
        const fetchInitialSettings = onValue(settingsRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            if (data.competition_start == 1 && data.competition_end != 1) {
                setExamStarted(true);
            }

            if (data.competition_end == 1) {
                setExamStarted(false);
            }
        });

        // 2. Listen for changes
        const unsubscribe = onChildChanged(settingsRef, (snapshot) => {
            const key = snapshot.key;
            const value = snapshot.val();

            if (key === 'competition_start' && value == 1) {
                setExamStarted(true);
            }

            if (key === 'competition_end' && value == 1) {
                setExamStarted(false);
            }
        });

        // Cleanup
        return () => {
            fetchInitialSettings(); // unsubscribe from onValue
            unsubscribe(); // unsubscribe from onChildChanged
        };
    }, []);




    useEffect(() => {

        if (!detail?.image) {
            setShowModal(false);
        }
    }, [detail]);

    useEffect(() => {
        if (cameraActive) {
            const startCamera = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'user' },
                        audio: false,
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (err) {
                    setStatus("❌ Camera access denied.");
                    console.error(err);
                }
            };

            startCamera();
        }

        return () => {
            const tracks = videoRef.current?.srcObject?.getTracks();
            tracks?.forEach((track) => track.stop());
        };
    }, [cameraActive]);

    useEffect(() => {
        if (alertModal) {
            const timer = setTimeout(() => {
                setAlertModal(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alertModal]);

    const handleUpload = async () => {
        if (!profileImage) return setStatus('❌ Please take a photo first.');

        setStatus('⏳ Uploading...');
        const formData = new FormData();
        formData.append('student_id', student_id);
        formData.append('image', profileImage);

        try {
            const res = await fetch(`${API_URL}/listeningStudentChangeImage`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const result = await res.json();

            if (res.ok) {
                // ✅ Update local session storage
                const updatedDetail = { ...detail, image: captured };
                sessionStorage.setItem('data', JSON.stringify(updatedDetail));
                setStatus('✅ Uploaded successfully!');
                setShowModal(false);
                setAlertModal(true);
                setAlertData("success");
            } else {
                setStatus(`❌ Error: ${result.message || 'Upload failed'}`);
                setAlertModal(true);
                setAlertData("fail");
            }
        } catch (error) {
            console.error(error);
            setStatus('❌ Failed to upload image.');
        }
    };


    return (
        <>
            {showModal ? (
                <div className="modal fade show d-block capture-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered d-block" role="document">
                        <div className="d-flex justify-content-center">
                            <img src={Logo} alt="Logo" className="my-5" />
                        </div>
                        <div className="modal-content rounded-5 p-4">
                            <h5 className="modal-title mb-2">Capture Profile Image</h5>
                            <p className="mb-3">Your profile image is missing. Please upload it to continue.</p>

                            {/* Show video preview if camera is active and no photo is captured */}
                            {cameraActive && !captured && (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-100 rounded mb-3"
                                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                                />
                            )}

                            {/* Show captured image preview if available */}
                            {captured && (
                                <img
                                    src={captured}
                                    alt="Captured"
                                    className="w-100 rounded border mb-3"
                                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                                />
                            )}

                            <p className="text-muted">{status}</p>

                            <div className="d-flex justify-content-between align-items-center">
                                {/* Open Camera Button - Only shows if camera is not yet opened */}
                                {!cameraActive && !captured && (
                                    <div className="d-flex justify-content-between w-100">
                                        <button
                                            className="btn btn-green rounded-pill"
                                            onClick={async () => {
                                                setCameraActive(true);
                                                try {
                                                    const stream = await navigator.mediaDevices.getUserMedia({
                                                        video: { facingMode: 'user' },
                                                        audio: false,
                                                    });
                                                    if (videoRef.current) {
                                                        videoRef.current.srcObject = stream;
                                                    }
                                                } catch (error) {
                                                    setStatus("❌ Camera access denied.");
                                                }
                                            }}
                                        >
                                            Open Camera
                                        </button>
                                        <button
                                            className="btn btn-secondary rounded-pill me-2 px-4"
                                            onClick={() => {
                                                setCameraActive(false);
                                                setCaptured(null);
                                                setShowModal(false);
                                            }}
                                        >
                                            Skip
                                        </button>
                                    </div>
                                )}

                                {/* Capture Button */}
                                {cameraActive && !captured && (
                                    <button
                                        className="btn btn-outline-secondary rounded-pill"
                                        onClick={() => {
                                            const video = videoRef.current;
                                            if (!video) return;

                                            const canvas = document.createElement("canvas");
                                            canvas.width = video.videoWidth;
                                            canvas.height = video.videoHeight;
                                            const ctx = canvas.getContext("2d");
                                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                                            canvas.toBlob((blob) => {
                                                if (blob) {
                                                    const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
                                                    setProfileImage(file);
                                                    setCaptured(URL.createObjectURL(blob));
                                                    setStatus("✅ Photo captured. Click 'Submit' to continue.");
                                                    setCameraActive(false);

                                                    // Stop video stream
                                                    if (video.srcObject) {
                                                        video.srcObject.getTracks().forEach(track => track.stop());
                                                    }
                                                }
                                            }, "image/jpeg", 0.95);
                                        }}
                                    >
                                        📸 Capture
                                    </button>
                                )}

                                {/* Retake Button */}
                                {captured && (
                                    <button
                                        className="btn btn-warning rounded-pill"
                                        onClick={async () => {
                                            setCaptured(null);
                                            setProfileImage(null);
                                            setStatus("📸 Ready to capture again.");
                                            setCameraActive(true);

                                            try {
                                                const stream = await navigator.mediaDevices.getUserMedia({
                                                    video: { facingMode: 'user' },
                                                    audio: false,
                                                });
                                                if (videoRef.current) {
                                                    videoRef.current.srcObject = stream;
                                                }
                                            } catch (error) {
                                                setStatus("❌ Camera access denied.");
                                            }
                                        }}
                                    >
                                        🔄 Retake Photo
                                    </button>
                                )}

                                {cameraActive || captured ? (
                                    <div>
                                        <button
                                            className="btn btn-secondary rounded-pill me-2 px-4"
                                            onClick={() => {
                                                setCameraActive(false);
                                                setCaptured(null);
                                                setShowModal(false);
                                            }}
                                        >
                                            Skip
                                        </button>
                                        <button className="btn btn-green rounded-pill px-4" onClick={handleUpload}>
                                            Submit
                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-backdrop fade show"></div> */}
                </div >
            ) : (
                <div className="main-container bg-theme">
                    {alertModal && (
                        <>
                            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: '#000000a8' }}>
                                <div className="modal-dialog modal-dialog-centered d-block" role="document">
                                    <div className="modal-content rounded-5 p-4">
                                        {alertData === "success" ?
                                            (
                                                <>
                                                    <div className="text-center">
                                                        <img src={checkGif} alt="Correct" className="w-75 mb-2" />
                                                        <h3 className="text-0FB1A1 fw-bold mb-4 fs-28">Profile image uploaded successfully.</h3>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-center">
                                                        <img src={crossGif} alt="Correct" className="w-75 mb-2" />
                                                        <h3 className="text-0FB1A1 fw-bold mb-4 fs-28">Unable to upload the image.</h3>
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <Header data={{ title: 'Hello', detail: detail?.username, description: '' }} />
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row py-4">
                                <div className="col-12 col-md-6 col-xl-4 mb-4">
                                    <Link to="/listening-practice" className="text-decoration-none">
                                        <div className="card border-0 rounded-4 shadow-sm">
                                            <div className="card-body">
                                                {/* <img src={listeningCardImg} alt="" className="mb-2" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                                                    <circle cx="27.5" cy="27.5" r="27.5" fill="#FCF3E2" />
                                                    <g clipPath="url(#clip0_7202_445)">
                                                        <path d="M25.0781 27.7422C25.0781 28.6785 24.3191 29.4375 23.3828 29.4375C22.4465 29.4375 21.6875 28.6785 21.6875 27.7422C21.6875 25.0713 23.8604 22.8984 26.5312 22.8984C29.2021 22.8984 31.375 25.0713 31.375 27.7422C31.375 28.6785 30.616 29.4375 29.6797 29.4375C28.7434 29.4375 27.9844 28.6785 27.9844 27.7422C27.9844 26.9409 27.3325 26.2891 26.5312 26.2891C25.73 26.2891 25.0781 26.9409 25.0781 27.7422ZM26.5312 17.0859C20.6554 17.0859 15.875 21.8663 15.875 27.7422C15.875 28.6785 16.634 29.4375 17.5703 29.4375C18.5066 29.4375 19.2656 28.6785 19.2656 27.7422C19.2656 23.7359 22.525 20.4766 26.5312 20.4766C30.5375 20.4766 33.7969 23.7359 33.7969 27.7422C33.7969 32.2931 29.4975 31.9993 29.4377 36.438L29.4375 36.4609C29.4375 38.197 28.0251 39.6094 26.2891 39.6094C25.3528 39.6094 24.5938 40.3684 24.5938 41.3047C24.5938 42.241 25.3528 43 26.2891 43C29.8901 43 32.8206 40.0739 32.8281 36.4746C32.8642 34.3901 37.1875 33.5538 37.1875 27.7422C37.1875 21.8663 32.4071 17.0859 26.5312 17.0859ZM21.6875 31.375C20.6175 31.375 19.75 32.2424 19.75 33.3125C19.75 34.3825 20.6175 35.25 21.6875 35.25C22.7575 35.25 23.625 34.3825 23.625 33.3125C23.625 32.2424 22.7575 31.375 21.6875 31.375ZM13.9375 39.125C12.8675 39.125 12 39.9924 12 41.0625C12 42.1325 12.8675 43 13.9375 43C15.0075 43 15.875 42.1325 15.875 41.0625C15.875 39.9924 15.0075 39.125 13.9375 39.125ZM43 27.7426C43 27.6507 42.9993 27.5594 42.9973 27.4683C42.8835 20.5083 38.4079 14.3292 31.859 12.0915C30.973 11.7889 30.0094 12.2616 29.7066 13.1475C29.4038 14.0335 29.8767 14.9972 30.7626 15.3C35.964 17.0773 39.5183 21.9912 39.6071 27.5276L39.6073 27.539C39.6089 27.6067 39.6093 27.6744 39.6093 27.7426C39.6093 28.6789 40.3683 29.4379 41.3046 29.4379C42.2409 29.4379 43 28.6789 43 27.7426ZM21.2619 38.5818L16.4182 33.7381L14.3631 35.7931L19.2069 40.6368L21.2619 38.5818Z" fill="#E9AE24" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_7202_445">
                                                            <rect width="31" height="31" fill="white" transform="translate(12 12)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <h4 className="text-000000 fw-semibold fs-22 mt-2">Listening Practice</h4>
                                                <h5 className="text-434343 text-normal mb-0 fs-18"></h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {!examStarted ? ('') : (<div className="col-12 col-md-6 col-xl-4 mb-4">
                                    <Link to="/termsandconditions" className="text-decoration-none">
                                        <div className="card border-0 rounded-4 shadow-sm">
                                            <div className="card-body">
                                                {/* <img src={competitionCardImg} alt="" className="mb-2" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                                                    <circle cx="27.5" cy="27.5" r="27.5" fill="#FFD8FF" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.1906 43.4109C24.628 43.4413 22.0731 43.1253 19.5952 42.4713C18.4798 42.2013 17.4168 41.7482 16.4495 41.1307C16.0655 40.8561 15.7139 40.5388 15.4015 40.185C15.108 39.8428 14.9635 39.3975 15.0004 38.9482C15.0756 34.9472 17.8678 31.5124 21.7692 30.6218C22.0816 30.5225 22.4226 30.5794 22.6859 30.7746C23.9152 31.6158 25.3696 32.0665 26.8591 32.0679C28.1117 32.1467 29.3654 31.9331 30.5211 31.4438C31.0276 31.2078 31.4974 30.8931 31.9878 30.6219C32.0709 30.5709 32.1678 30.5469 32.2651 30.5532C35.7118 31.167 38.4512 33.7934 39.2096 37.2112C39.3104 37.7636 39.3813 38.321 39.422 38.8811C39.4685 39.4747 39.2412 40.0572 38.8048 40.4623C38.1531 41.0911 37.3775 41.5773 36.5276 41.89C35.1331 42.4458 33.6768 42.8322 32.1902 43.0412C30.5366 43.3008 28.8645 43.4245 27.1906 43.4109L27.1906 43.4109Z" fill="#DD50F2" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.0339 17.3699C19.0233 17.5685 19.0148 17.6999 19.2119 17.7977C19.3569 17.8728 19.4516 18.0187 19.4611 18.1817C19.4707 18.3446 19.3937 18.5006 19.2585 18.5921C19.1626 18.6452 19.1103 18.7528 19.1278 18.861C19.2439 20.4033 19.3417 21.9479 19.4762 23.4886C19.4855 24.1551 19.3497 24.8156 19.0782 25.4243C19.0621 25.4709 19.0018 25.5007 18.9621 25.5405C18.9285 25.5046 18.8773 25.4748 18.8628 25.4328C18.5823 24.7884 18.4499 24.0893 18.4755 23.387C18.6138 22.0403 18.6756 20.6852 18.7696 19.3339C18.7772 19.2231 18.7925 19.1131 18.8017 19.0023C18.8483 18.8319 18.7837 18.6504 18.6398 18.5478C18.5202 18.4483 18.4604 18.2942 18.4815 18.1401C18.5026 17.986 18.6017 17.8537 18.7437 17.79C18.943 17.7014 18.9101 17.5418 18.9193 17.4081C18.9193 17.3531 18.7925 17.2759 18.7107 17.2332C18.5282 17.1369 18.3288 17.0728 18.1531 16.9643C17.8613 16.7809 17.859 16.5059 18.1577 16.3341C18.4302 16.1872 18.7107 16.0558 18.9979 15.9407C21.3629 14.915 23.7287 13.8909 26.0952 12.8683C26.7987 12.5484 27.6058 12.5468 28.3105 12.8637C30.8869 13.9775 33.4627 15.0917 36.038 16.2065C36.2427 16.2951 36.481 16.3883 36.4781 16.6511C36.4751 16.9139 36.2382 17.0017 36.0327 17.0911C35.2061 17.4501 34.3804 17.8099 33.5508 18.1605C33.4218 18.1962 33.3383 18.321 33.3544 18.4539C33.3644 19.1796 33.34 19.9053 33.3682 20.6309C33.4077 20.9225 33.4733 21.2099 33.5645 21.4896C33.9947 23.4295 33.6204 25.4609 32.5271 27.1202C31.7538 28.4787 30.5373 29.5305 29.0812 30.0994C27.2558 30.8139 25.1844 30.4532 23.708 29.1636C22.0606 27.874 20.9897 25.9854 20.7289 23.9096C20.5884 22.9232 20.6803 21.9178 20.997 20.9732C21.0377 20.8475 21.0593 20.7165 21.0611 20.5844C21.0673 19.8732 21.0611 19.162 21.0673 18.4508C21.087 18.3257 21.0108 18.2054 20.8893 18.1697C20.2821 17.9161 19.6756 17.6464 19.0339 17.3699Z" fill="#DD50F2" />
                                                </svg>
                                                <h4 className="text-000000 fw-semibold fs-22 mt-2">Competition</h4>
                                                <h5 className="text-434343 text-normal fs-18 mb-0"></h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home