import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import videoImg from '../assets/images/defult-Video.png';

export const Camera: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true, video: true });

  let videoRef: HTMLVideoElement | null = null;

  useEffect(() => {
    // Open the camera when the component mounts
    handleOpenCamera();

    // Clean up the camera stream when the component unmounts
    return () => {
      const mediaStream = videoRef?.srcObject as MediaStream;
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef) {
        videoRef.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
    handleCloseCamera();
  };

  const handleCloseCamera = () => {
    if (status === 'recording') {
      stopRecording();
    }
    setIsCameraOpen(false);

    // Close the camera stream
    const mediaStream = videoRef?.srcObject as MediaStream;
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }

    setIsPreviewing(false); // Reset preview state
  };

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = mediaBlobUrl!;
    anchor.download = 'recorded-video.webm';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const [currentH2Index, setCurrentH2Index] = useState(0);

  const handleNextClick = () => {
    setCurrentH2Index(prevIndex => Math.min(prevIndex + 1, 4)); // Assuming there are 5 h2 elements
  };

  const handlePrevClick = () => {
    setCurrentH2Index(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const isLastIndex = currentH2Index === 4; // Assuming there are 5 h2 elements
  const isFirstIndex = currentH2Index === 0;

  return (
    <>
      <div className='col-md-6'>
        <div className='col-md-12 camera-width-con'>
          <video
            ref={(ref) => (videoRef = ref)}
            src={mediaBlobUrl}
            autoPlay
          />
        </div>
      </div>
    </>
  );
};
