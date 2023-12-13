import React, { useRef, useEffect } from 'react';
interface CameraViewProps {
    isPreviewing: boolean;
    mediaBlobUrl?: string; // Make it optional
    videoRef: React.RefObject<HTMLVideoElement>;
    isCameraOpen: boolean;
    status: string;
    onOpenCamera: () => void;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onCloseCamera: () => void;
    onDownload: () => void;
    // onNextClick: () => void;
    // onPrevClick: () => void;
    isFirstIndex: boolean;
    isLastIndex: boolean;
}
export const CameraView: React.FC<CameraViewProps> = ({ isPreviewing, mediaBlobUrl, videoRef, isCameraOpen,
    status,
    onCloseCamera, }) => {
    useEffect(() => {
        if (videoRef.current && mediaBlobUrl) {
            videoRef.current.src = mediaBlobUrl;
        }
    }, [mediaBlobUrl, videoRef]);
    return (
        <div className='col-md-6'>
            <div className='col-md-12 camera-width-con'>
                <video
                    ref={videoRef}
                    src={mediaBlobUrl}
                    autoPlay
                />
            </div>
        </div>
    );
};