import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { CameraOpen } from '../component/form/CameraOpen';
// import { Camera } from './Camera';
import { useReactMediaRecorder } from 'react-media-recorder';
import videoImg from '../assets/images/defult-Video.png';
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


export const QuizComponent: React.FC = () => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questionTimer, setQuestionTimer] = useState<NodeJS.Timer | undefined>(undefined);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [countdownTimer, setCountdownTimer] = useState<number | null>(null);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();
  const currentQuestion = quizQuestions[currentQuestionIndex];

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
    // setSelectedOption(null);
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
    // setSelectedOption(null);
    setSelectedOption(selectedOptions[currentQuestionIndex - 1] || null);
    setRemainingTime(null);

    if (currentQuestionIndex > 0) {
      if (!isLastQuestion) {
        startQuestionTimer();
      }
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleSubmitClick = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex === quizQuestions.length - 1) {
      setShowScore(true);
      setTimeUp(false);
      setRemainingTime(null);
      clearInterval(questionTimer);
    } else {
      handleNextClick();
    }
    handleNextClick();
  };

  //const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const closePopup = () => {
    setLoginFailed(false);
    setShowScore(false);
    navigate("/");
  };
  useEffect(() => {
    if (isLastQuestion) {
      // Set a timer for auto-submit after 5 seconds
      const autoSubmitTimer = setTimeout(() => {
        handleAutoSubmit();
      }, 5000);

      // Clear the timer if the component unmounts or if the user manually submits before the auto-submit
      return () => clearTimeout(autoSubmitTimer);
    }
  }, [isLastQuestion]);

  const handleAutoSubmit = () => {
    // Implement auto-submit logic here
    console.log('Auto-submitting...');
    handleSubmitClick();
  };
  return (
    <div className="container mt-4">

      <section className='d-flex content-justify-center m-auto'>
        <Card>
          <div className='container'>
            <div className="text-center py-3 mb-3">
              {!isLastQuestion && remainingTime !== null && <h5>Time Remaining:  <span style={{ color: 'red' }}>{remainingTime}</span> sec!</h5>}
              {isLastQuestion && remainingTime !== null && <h5>Your time is up!</h5>}
            </div>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
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

      <div className="row">
        <div className="col-md-12 col-sm-12 text-center">
          {showScore && (
            <div className="overlay">
              <div className="popup">
                <div className="text-success py-3">
                  <h4>You have submitted successfully!</h4>
                </div>
                <div className="text-danger py-3">
                  <h4>Your Score: {score} / {quizQuestions.length}</h4>
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
