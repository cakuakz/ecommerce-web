'use client';

import * as faceapi from 'face-api.js';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';

import { useGetUserProperty } from '@/modules/state/general';

import CustomAlertModal from '../menu/customalertmodal';

const ProfilePresence = () => {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [modalShown, setModalShown] = useState(false);
    const { data: session } = useSession()
    const img_url = useGetUserProperty((state) => state.img_url);

    const videoRef = useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef();

    useEffect(() => {
      const loadUserProfile = async () => {
        if (img_url) {
          try {
              const img = await faceapi.fetchImage(img_url)
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    
              if (!detections) {
                  toast.error("No face detected")
                  return
              }
    
              const faceDescriptor = [detections.descriptor]
    
              const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors('user', faceDescriptor)
              const matcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
              setFaceMatcher(matcher)
          } catch (error) {
              console.error('Error fetching user profile image:', error)
          }
        } else if (!modalShown) {
          CustomAlertModal({
            modalTitle: "Profile Picture Not Found!",
            children: <p>Please add your profile picture first so the system can detect your face and fill your attendnace</p>
          })
          setModalShown(true);
        }
      }

      loadModels().then(loadUserProfile)
    }, [img_url, modalShown])

    const loadModels = async () => {
      const MODEL_URL = '/models'

      await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ])

      setModelsLoaded(true)
    }

    const startVideo = () => {
        setCaptureVideo(true)
        navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then(stream => {
            const video = videoRef.current
            video.srcObject = stream
            video.play()
        })
        .catch(err => {
            console.error("error:", err)
        });
    }

    const handleVideoOnPlay = () => {
      if (!modelsLoaded) return

      let apiCalled = false

      const intervalId = setInterval(async () => {
          if (canvasRef && canvasRef.current && videoRef && videoRef.current && faceMatcher) {
              const canvasElement = faceapi.createCanvasFromMedia(videoRef.current);
              canvasRef.current.innerHTML = '';
              canvasRef.current.appendChild(canvasElement);

              const displaySize = { width: videoWidth, height: videoHeight };
              faceapi.matchDimensions(canvasElement, displaySize);

              const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
              const resizedDetections = faceapi.resizeResults(detections, displaySize);

              const context = canvasElement.getContext('2d');
              if (context) {
                  context.clearRect(0, 0, videoWidth, videoHeight);
                  faceapi.draw.drawDetections(canvasElement, resizedDetections);
                  faceapi.draw.drawFaceLandmarks(canvasElement, resizedDetections);

                  const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
                  results.forEach(result => {
                      if (result.label === 'user' && !apiCalled) {
                          apiCalled = true;
                          postMatchDetected();
                          clearInterval(intervalId); 
                      }
                  });
              }
          }
      }, 100);
    };

    const postMatchDetected = async () => {
      const payload = {
        isAttended: true,
        userId: session.user.id
      }
      try {
          const response = await fetch('/api/attendance/add-attendance', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
          });
          const data = await response.json()
            .then((res) => toast.success(res.message))
            .catch((error) => toast.error(error))
          console.log('Attendance response:', data);
      } catch (error) {
          console.error('Error posting attendance data:', error);
      }
    };

    const closeWebcam = () => {
        videoRef.current.pause()
        videoRef.current.srcObject.getTracks()[0].stop()
        setCaptureVideo(false)
    }

    return (
    <div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Close Webcam
            </button>
            :
            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Open Webcam
            </button>
        }
      </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </div>
    )
}
 
export default ProfilePresence;