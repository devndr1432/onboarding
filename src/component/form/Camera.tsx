// CameraOpen.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

interface CameraOpenProps {
  onCameraOpen: () => void;
  onCloseCamera: () => void;
}

export const Camera: React.FC<CameraOpenProps> = ({ onCameraOpen, onCloseCamera }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true, video: true });

  let videoRef = useRef<HTMLVideoElement | null>(null);
  const closeCameraTimeoutRef = useRef<number | null>(null);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
      onCameraOpen(); // Call the callback when the camera is opened
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCloseCamera = () => {
    onCloseCamera();
  };
  useEffect(() => {
    // Open the camera on component load
    handleOpenCamera();

    // Set a timeout to close the camera after 5 seconds
    // closeCameraTimeoutRef.current = window.setTimeout(() => {
    //   handleCloseCamera();
    // }, 30000);

    // Cleanup the timeout to avoid memory leaks
    return () => {
      //   if (closeCameraTimeoutRef.current) {
      //     clearTimeout(closeCameraTimeoutRef.current);
      //   }
    };
  }, []);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
    handleCloseCamera();
  };

  //   const handleCloseCamera = () => {
  //     console.log('Closing camera...');
  //     if (status === 'recording') {
  //       stopRecording();
  //     }
  //     setIsCameraOpen(false);

  //     // Close the camera stream
  //     const mediaStream = videoRef?.current?.srcObject as MediaStream;
  //     if (mediaStream) {
  //       mediaStream.getTracks().forEach(track => track.stop());
  //     }

  //     setIsPreviewing(false); // Reset preview state
  //   };

  return (
    <>
      <div className='col-md-6'>
        <div className='col-md-12 camera-width-con'>
          <video
            ref={videoRef}
            src={mediaBlobUrl}
            autoPlay
          />
        </div>
      </div>
      {/* Additional JSX if needed */}
    </>
  );
};

//export default CameraOpen;
