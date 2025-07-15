import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';

const FaceRecognitionLogin = ({ onSuccess, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [status, setStatus] = useState('Initializing models...');
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  // Load face-api models
  useEffect(() => {
    const MODEL_URL = import.meta.env.BASE_URL + 'models/';
    async function loadModels() {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setIsModelsLoaded(true);
        setStatus('Models loaded. Starting camera...');
      } catch (err) {
        console.error('Model load error:', err);
        setStatus('❌ Failed to load face-api models.');
      }
    }
    loadModels();
  }, []);

  // Start camera
  useEffect(() => {
    if (!isModelsLoaded) return;

    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          setStatus('❌ Camera not supported in this browser.');
          return;
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter(d => d.kind === 'videoinput');
        if (cams.length === 0) {
          setStatus('❌ No camera found.');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: cams[0]?.deviceId ? { exact: cams[0].deviceId } : true }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setStatus('Camera started. Click "Scan Face".');
          };
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setStatus('❌ Unable to access camera.');
      }
    }

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [isModelsLoaded]);

  const averageEyeDistance = (eye1, eye2) => {
    const distances = eye1.map((point, i) =>
      Math.hypot(point.x - eye2[i].x, point.y - eye2[i].y)
    );
    return distances.reduce((a, b) => a + b, 0) / distances.length;
  };

  const handleFaceScan = async () => {
    setStatus('🔍 Scanning face...');
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 224,
      scoreThreshold: 0.5
    });

    const liveResult = await faceapi
      .detectSingleFace(video, options)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!liveResult) {
      setStatus('❌ No face detected. Try again.');
      return;
    }

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    faceapi.matchDimensions(canvas, { width: videoWidth, height: videoHeight });
    const resizedResult = faceapi.resizeResults(liveResult, { width: videoWidth, height: videoHeight });

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedResult);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResult);

    setStatus('🔄 Loading reference image...');


    const storedImageUrl = sessionStorage.getItem('faceReferenceUrl');
    if (!storedImageUrl) {
      setStatus('❌ No reference image URL in sessionStorage.');
      return;
    }

    let referenceImg = new Image();
    referenceImg.crossOrigin = 'anonymous';
    referenceImg.src = storedImageUrl;

    try {
      await new Promise((resolve, reject) => {
        referenceImg.onload = resolve;
        referenceImg.onerror = reject;
      });
    } catch (error) {
      console.error('❌ Image failed to load or cross-origin blocked:', error);
      setStatus('❌ Failed to load reference image from session.');
      return;
    }


    const referenceResult = await faceapi
      .detectSingleFace(referenceImg, options)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!referenceResult) {
      setStatus('❌ Reference face not detected.');
      return;
    }

    const descriptorDistance = faceapi.euclideanDistance(
      liveResult.descriptor,
      referenceResult.descriptor
    );
    if (descriptorDistance < 0.5) {
      setStatus('✅ Face matched. Logging in...');
      navigate('/login');
    } else {
      setStatus('❌ Face descriptor did not match.');
    }
  };

  return (
    <div className="text-center p-4 text-white bg-dark" style={{ minHeight: '100vh' }}>
      <h2 className="mb-3">Face Recognition Login</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          maxWidth: '480px',
          border: '2px solid #fff',
          borderRadius: 10,
          background: '#000',
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 90,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '480px',
        }}
      />

      <p className="mt-3">{status}</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-success" onClick={handleFaceScan}>Scan Face</button>
        <button className="btn btn-outline-light" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};


export default FaceRecognitionLogin;
