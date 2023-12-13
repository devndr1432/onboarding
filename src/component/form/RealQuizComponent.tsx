import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import videoImg from '../../assets/images/defult-Video.png';
export const RealQuizComponent: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true, video: true });

  let videoRef: HTMLVideoElement | null = null;

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
  }

  const handlePrevClick = () => {
    setCurrentH2Index(prevIndex => Math.max(prevIndex - 1, 0));
  }
  const isLastIndex = currentH2Index === 4; // Assuming there are 5 h2 elements
  const isFirstIndex = currentH2Index === 0;

  return (
    <>
      <section className='practice-section'>
        <div className='container-fluid'>
          <div className='container'>
            <div className='row  my-2'>
              <div className='col-md-12'>
              </div>
              <div className='col-md-6 order-mobail'>
                <div className='col-md-12 text-center '>
                  {!isCameraOpen && (
                    <button onClick={handleOpenCamera} className='camera-btns-contrl'>Open Camera</button>
                  )}
                  {isCameraOpen && status === 'idle' && (
                    <>
                      <button onClick={handleStartRecording} className='camera-btns-contrl'>Start Recording</button>
                      <button onClick={handleCloseCamera} className='camera-btns-contrl'>Close Camera</button>
                    </>

                  )}


                  {status === 'recording' && (
                    <>
                      <div className="demo_Qns">
                        <p style={{ display: currentH2Index === 0 ? 'block' : 'none' }}>Tell me about yourself.</p>
                        <p style={{ display: currentH2Index === 1 ? 'block' : 'none' }}>What are your strengths?</p>
                        <p style={{ display: currentH2Index === 2 ? 'block' : 'none' }}>What are your weaknesses?</p>
                        <p style={{ display: currentH2Index === 3 ? 'block' : 'none' }}>Why do you want this job?</p>
                        <p style={{ display: currentH2Index === 4 ? 'block' : 'none' }}>Why should we hire you?</p>
                        <div className='que-btn'>
                          <button onClick={handlePrevClick} disabled={isFirstIndex}>prev</button>
                          <button onClick={handleNextClick} disabled={isLastIndex}>next</button>
                        </div>
                      </div>
                      <button onClick={handleStopRecording} className='camera-btns-contrl'>Stop Recording</button>
                    </>
                  )}


                  {mediaBlobUrl && (
                    <button onClick={handleDownload} disabled={!mediaBlobUrl} className='camera-btns-contrl'>
                      Download
                    </button>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-md-12 camera-width-con'>
                  {!isPreviewing && (
                    <img src={videoImg} alt="" style={{ display: isCameraOpen ? 'none' : 'block' }} />
                  )}
                  {isPreviewing ? (
                    <video
                      src={mediaBlobUrl}
                      controls
                      autoPlay

                    />
                  ) : (

                    <video
                      ref={(ref) => (videoRef = ref)}
                      style={{ display: isCameraOpen ? 'block' : 'none' }}
                      controls
                      autoPlay
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
