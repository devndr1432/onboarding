import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CameraView } from '../component/CameraView';
import { Opening } from '../component/Opening';
import { useReactMediaRecorder } from 'react-media-recorder';
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  videoURL: string;
  timer: number;
  cameraOpen: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Venus", "Earth", "Jupiter"],
    correctAnswer: "Mars",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    options: ["1492", "1500", "1510", "1600"],
    correctAnswer: "1492",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "Which famous scientist developed the theory of general relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Gobi Desert", "Sahara Desert", "Arabian Desert", "Antarctica"],
    correctAnswer: "Antarctica",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "Which famous playwright wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Emily Brontë"],
    correctAnswer: "William Shakespeare",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: "Au",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
     timer: 30,
    cameraOpen: false,
  },
  {
    question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    options: ["Mars", "Venus", "Mercury", "Saturn"],
    correctAnswer: "Venus",
    videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
     timer: 30,
    cameraOpen: false,
  },
];

export const RealQuiz: React.FC = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questionTimer, setQuestionTimer] = useState<NodeJS.Timer | undefined>(undefined);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [countdownTimer, setCountdownTimer] = useState<number | null>(null);
  const [countdownTimer_live, setCountdownTimer_live] = useState<number | null>(null);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string | null>(null);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const remainingTimePerQuestion = quizQuestions.map(
    (question, index) => (selectedOptions[index] === undefined ? question.timer : 0)
  );
  const totalRemainingTime = remainingTimePerQuestion.reduce((acc, time) => acc + time, 0);
  const countdownDuration_live = totalRemainingTime * 100; // Convert total remaining time to milliseconds


  const startCountdownLive = () => {
    let timer_live = countdownDuration_live / 100; // Convert to seconds

    const countdownTimer_liveId = setInterval(() => {
      timer_live -= 1;
      setCountdownTimer_live(timer_live);

      if (timer_live <= 0) {
        handleCloseCamera();
        setTimeout(() => {
          setTimeUp(true);
        }, 1000); //
        setTimeout(() => {
          setShowScore(true);
          handleAutoSubmit();
        }, 5000); //

        clearInterval(countdownTimer_liveId);
      }
    }, 1000);

    return () => clearInterval(countdownTimer_liveId);
  };

  useEffect(() => {
    setQuizStarted(true);
    handleOpenCamera_open();
    console.log('Quiz start will be after ${timer} sec!');
    const countdownDuration = 30000; // Countdown duration in milliseconds
    let timer = countdownDuration / 1000; // Convert to seconds

    const quizTimerId = setInterval(() => {
      timer -= 1;
      setCountdownTimer(timer);
      console.log(`Quiz start will be after ${timer} sec!`);
      if (timer <= 0) {
        setQuizStarted(false);
        handleCloseCamera_opening();
        handleOpenCamera();
        startCountdownLive();
        console.log('Quiz started!');
        if (currentQuestionIndex < quizQuestions.length - 1) {
          startQuestionTimer();
        }
        clearInterval(quizTimerId);
      }
    }, 1000);

    return () => clearInterval(quizTimerId);
  }, [quizQuestions]);

  const startQuestionTimer = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestionIndex < quizQuestions.length) {
      setRemainingTime(currentQuestion.timer);
      if (questionTimer) {
        clearInterval(questionTimer);
      }

      const questionTimerId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime !== null) {
            const newTime = prevTime - 1;

            if (newTime <= 0) {
              clearInterval(questionTimerId);

              if (currentQuestionIndex === quizQuestions.length - 1) {
                setRemainingTime(null);
                console.log('Remaining time set to null on the last question');
              } else {
                handleNextClick();
              }
            }

            return newTime;
          }
          return null;
        });
      }, 1000);

      setQuestionTimer(questionTimerId);

    }
  };

  const handleNextClick = () => {
    setTimeUp(false);
    setCurrentQuestionIndex((prevIndex: number) => Math.min(prevIndex + 1, quizQuestions.length - 1));

    // Store the selected option for the current question
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: selectedOption,
    }));

    setSelectedOption(selectedOptions[currentQuestionIndex + 1] || null);
    setRemainingTime(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      if (!isLastQuestion) {
        startQuestionTimer();
      } else {
        setShowScore(true);
        setTimeUp(false);
        setRemainingTime(null);
        clearInterval(questionTimer);
        startQuestionTimer();
      }
    }
  };

  const handlePrevClick = () => {
    setCurrentQuestionIndex((prevIndex: number) => Math.max(prevIndex - 1, 0));
    setTimeUp(false);
    const prevSelectedOption = selectedOptions[currentQuestionIndex - 1] || null;
    setSelectedOption(prevSelectedOption);
    setRemainingTime(null);
    if (currentQuestionIndex > 0) {
      if (!isLastQuestion) {
        startQuestionTimer();
      }
    }
  };

  const handleOptionChange = (option: string) => {
    console.log("Selected option:", option);
    // Update the selected option for the current question
    setSelectedOption(option);
    // Update the selectedOptions state
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleSubmitClick = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    console.log(`Question ${currentQuestionIndex + 1}: Selected = ${selectedOption}, Correct = ${currentQuestion.correctAnswer}, IsCorrect = ${isCorrect}`);
    handleCloseCamera();
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    if (currentQuestionIndex === quizQuestions.length - 1) {
      // If it's the last question, show the score
      setShowScore(true);
      setTimeUp(false); // Set time up to false
      setRemainingTime(null); // Set remaining time to null
      clearInterval(questionTimer);
    } else {
      handleNextClick();
    }
    // Move to the next question
    handleNextClick();
  };
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const closePopup = () => {
    setLoginFailed(false);
    setShowScore(false);
    navigate("/");
  };

  const handleAutoSubmit = () => {
    console.log('Auto-submitting...');
    handleSubmitClick();
  };



  function formatTime(seconds: any) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const getTotalCorrectAnswers = () => {
    const totalCorrectAnswers = Object.values(selectedOptions).filter((selectedOption, index) => {
      const isCorrect = selectedOption === quizQuestions[index].correctAnswer;
      console.log(`Question ${index + 1}: Selected = ${selectedOption}, Correct = ${quizQuestions[index].correctAnswer}, IsCorrect = ${isCorrect}`);
      return isCorrect;
    }).length;

    console.log(`Total Correct Answers: ${totalCorrectAnswers}`);
    return totalCorrectAnswers;
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    video: true,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOpenCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } else {
      console.error('getUserMedia is not supported in this browser');
    }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleOpenCamera_open = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } else {
      console.error('getUserMedia is not supported in this browser');
    }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Inside the handleCloseCamera function
  const handleCloseCamera = () => {
    if (status === 'recording') {
      stopRecording();
    }

    setIsCameraOpen(false);

    const mediaStream = videoRef.current?.srcObject as MediaStream;
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    setIsPreviewing(false);
  };

   // Inside the handleCloseCamera function
   const handleCloseCamera_opening = () => {
    if (status === 'recording') {
      stopRecording();
    }

    setIsCameraOpen(false);

    const mediaStream = videoRef.current?.srcObject as MediaStream;
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    setIsPreviewing(false);
  };
  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
    handleCloseCamera();
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

  const handleNextClicks = () => {
    setCurrentH2Index((prevIndex) => Math.min(prevIndex + 1, 4)); // Assuming there are 5 h2 elements
  };

  const handlePrevClicks = () => {
    setCurrentH2Index((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const isLastIndex = currentH2Index === 4; // Assuming there are 5 h2 elements
  const isFirstIndex = currentH2Index === 0;

  return (
    <div className="container mt-4">
      {quizStarted ? (
        <section className='d-flex content-justify-center m-auto'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 m-auto'>
                <div className="text-center">
                  {quizStarted && !timeUp && (
                    <h5>
                      Live Quiz start will be after{' '}
                      <span style={{ color: 'red' }}> {countdownTimer} </span> sec!
                    </h5>
                  )}
                </div>
              </div>
              <Opening
                status={status}
                onOpenCamera_open={handleOpenCamera_open}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                onCloseCamera_opne={handleCloseCamera_opening}
                onDownload={handleDownload}
                // onNextClick={handleNextClicks}
                // onPrevClick={handlePrevClicks}
                isFirstIndex={isFirstIndex}
                isLastIndex={isLastIndex}
                isCameraOpen={isCameraOpen}
                isPreviewing={isPreviewing}
                mediaBlobUrl={mediaBlobUrl}
                videoRef={videoRef}
              />

            </div>
          </div>
        </section>
      ) : (
        <section className='d-flex content-justify-center m-auto'>
          <Card>
            <div className='container'>
              <div className="text-center py-3 mb-3">
                {remainingTime !== null && ( <p>Time remaining : {formatTime(countdownTimer_live)} seconds</p>)}
                {timeUp &&
                 <div className="text-success py-3">
                  <h4>Your Time is up!</h4>
                </div>}
              </div>
              <div className='row'>
                <div className='col-md-6 col-sm-6'>
                  <Card.Body>
                    <Card.Title>{`Q${currentQuestionIndex + 1}: ${currentQuestion.question}`}</Card.Title>
                    <Card.Text>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {currentQuestion.options.map((option, i) => (
                          <li key={i} style={{ marginBottom: '10px' }}>
                            <input
                              type="radio"
                              id={`option${i}`}
                              name="options"
                              checked={selectedOption === option}
                              onChange={() => handleOptionChange(option)}
                            />
                            <label htmlFor={`option${i}`} className="ml-2 px-2">{`${i + 1}. ${option}`}</label>
                          </li>
                        ))}
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </div>
                <CameraView
                status={status}
                onOpenCamera={handleOpenCamera}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                onCloseCamera={handleCloseCamera_opening}
                onDownload={handleDownload}
                // onNextClick={handleNextClicks}
                // onPrevClick={handlePrevClicks}
                isFirstIndex={isFirstIndex}
                isLastIndex={isLastIndex}
                isCameraOpen={isCameraOpen}
                isPreviewing={isPreviewing}
                mediaBlobUrl={mediaBlobUrl}
                videoRef={videoRef}
              />
              
              </div>
            </div>
            <Card.Footer>
              <div className="d-flex justify-content-between py-3">
                <div className="col-md-6 col-sm-6">
                  <Button variant="primary" onClick={handlePrevClick} disabled={currentQuestionIndex === 0}>
                    Prev
                  </Button>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <Button variant="primary" onClick={handleNextClick} disabled={currentQuestionIndex === quizQuestions.length - 1}>
                    Next
                  </Button>
                </div>
              </div>
              {isLastQuestion && (
                <div className="col-md-12 col-sm-12 mt-2 py-3 text-center">
                  <Button variant="primary" onClick={handleSubmitClick}>
                    Submit
                  </Button>
                </div>
              )}
            </Card.Footer>
          </Card>
        </section>
      )}
      <div className="row">
        <div className="col-md-12 col-sm-12 text-center">
          {showScore && (
            <div className="overlay">
              <div className="popup">
                <div className="text-success py-3">
                  <h4>You have submitted successfully!</h4>
                </div>
                <div className="text-danger py-3">
                  <h4>Your Score:{getTotalCorrectAnswers()} / {quizQuestions.length}</h4>
                </div>
                <button className="btn btn-primary py-2" onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
