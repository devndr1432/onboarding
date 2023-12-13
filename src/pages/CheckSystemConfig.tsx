import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckSystemConfig: React.FC = () => {
    const [hasWebcam, setHasWebcam] = useState<boolean | null>(null);
    const [hasMic, setHasMic] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        // Add a timeout to simulate async operation and show spinner
        const timer = setTimeout(() => {
            if (navigator && navigator.mediaDevices) {
                navigator.mediaDevices.enumerateDevices().then(devices => {
                    const webcam = devices.some(device => device.kind === "videoinput");
                    const mic = devices.some(device => device.kind === "audioinput");

                    setHasWebcam(webcam);
                    setHasMic(mic);
                    setLoading(false); // Hide spinner after devices are checked

                    if (webcam) {
                        navigate('/landing-page'); // Navigate to dashboard if webcam is available
                    }
                    else {
                        // navigate('/home');
                    }
                });
            }
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }, [navigate]); // Include navigate in the dependency array

    return (
        <div className='spinner-section'>
            {loading ? (
                <div className="spinner m-auto"></div> // Simple spinner (you can style as needed)
            ) : (
                <>   <div className='d-flex m-auto text-center flex-column'>
                    <p className='PX-2'>Webcam: {hasWebcam ? "Available" : "Not Available"}</p>
                    <p className='px-2'>Microphone: {hasMic ? "Available" : "Not Available"}</p>
                </div>
                </>
            )}
        </div>
    );
}
