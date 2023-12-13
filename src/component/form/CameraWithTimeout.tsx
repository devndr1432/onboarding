import React, { useEffect } from 'react';
import { CameraOpen } from './CameraOpen';

interface CameraWithTimeoutProps {
  onCameraOpen: () => void;
}

export const CameraWithTimeout: React.FC<CameraWithTimeoutProps> = ({ onCameraOpen }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onCameraOpen();
    }, 30000); // Set timeout for 30 seconds

    return () => {
      clearTimeout(timeoutId); // Cleanup timeout on component unmount
    };
  }, [onCameraOpen]);

  return <CameraOpen onCameraOpen={onCameraOpen} />;
};

//export default CameraWithTimeout;
