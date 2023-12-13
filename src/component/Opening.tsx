import React, { useRef, useEffect } from 'react';
interface OpeningViewProps {
    isPreviewing: boolean;
    mediaBlobUrl?: string; // Make it optional
    videoRef: React.RefObject<HTMLVideoElement>;
    isCameraOpen: boolean;
    status: string;
    onOpenCamera_open: () => void;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onCloseCamera_opne: () => void;
    onDownload: () => void;
    isFirstIndex: boolean;
    isLastIndex: boolean;
}
export const Opening: React.FC<OpeningViewProps> = ({ isPreviewing, mediaBlobUrl, videoRef, isCameraOpen,
    status,
    onCloseCamera_opne, }) => {
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