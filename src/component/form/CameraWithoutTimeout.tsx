
import React from 'react';
import { Camera } from './Camera';

interface CameraWithoutTimeoutProps {
  onCameraOpen: () => void;
  onCloseCamera: () => void; // Pass the prop to CameraWithoutTimeout
}

export const CameraWithoutTimeout: React.FC<CameraWithoutTimeoutProps> = ({ onCameraOpen, onCloseCamera }) => {
  React.useEffect(() => {
    onCameraOpen();
  }, [onCameraOpen]);

  return <Camera onCameraOpen={onCameraOpen} onCloseCamera={onCloseCamera} />;
};

