import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./UserDashboard.css";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data;

  const [quizData, setQuizData] = useState([]);
  const [storedAnswers, setStoredAnswers] = useState([]);
  const [storedResults, setStoredResults] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({ email: '' });
  const [qsIndex, setQsIndex] = useState(0);
  const [time, setTime] = useState(30);
  const [started, setStarted] = useState(false);

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  /* ------------------ LOAD DATA ------------------ */
  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem('QuizData')) || [];
    const answers = JSON.parse(localStorage.getItem('answers')) || [];
    const results = JSON.parse(localStorage.getItem('results')) || [];

    setQuizData(quiz);
    setStoredAnswers(Array.isArray(answers) ? answers : []);
    setStoredResults(Array.isArray(results) ? results : []);
  }, []);

  /* ------------------ REDIRECT IF ALREADY ATTEMPTED ------------------ */
  useEffect(() => {
    if (data && storedAnswers.some(a => a.email === data.email)) {
      navigate('/Results');
    }
  }, [data, storedAnswers, navigate]);

  /* ------------------ TIMER + AUTO NEXT ------------------ */
  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setTime(prev => {
        if (prev === 1) {
          setQsIndex(i => i + 1);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started]);

  /* ------------------ AUTO SUBMIT WHEN FINISHED ------------------ */
  useEffect(() => {
    if (!started) return;

    if (qsIndex >= quizData.length) {
      endQuiz();
    }
  }, [qsIndex, started]);

  /* ------------------ LAST QUESTION CHECK ------------------ */
  useEffect(() => {
    if (qsIndex === quizData.length - 1) {
      setDisableSubmit(false);
      setDisableNext(true);
    } else {
      setDisableSubmit(true);
      setDisableNext(false);
    }
  }, [qsIndex, quizData.length]);

  /* ------------------ GUARDS ------------------ */
  if (!data) return <h2>Please login again</h2>;
  if (!quizData.length) return <h2>No quiz available</h2>;

  /* ------------------ HANDLERS ------------------ */
  const startQuiz = () => {
    setStarted(true);
    setTime(30);
    setQsIndex(0);
  };

  const skipQuestion = () => {
    if (qsIndex < quizData.length - 1) {
      setQsIndex(prev => prev + 1);
      setTime(30);
    }
  };

  const handleOptionChange = (index, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [index]: option,
      email: data.email,
    }));
  };

  /* ------------------ CHECK ANSWERS ------------------ */
  const checkAnswers = () => {
    let score = 0;

    quizData.forEach((question, index) => {
      if (question.correct === selectedOptions[index]) {
        score++;
      }
    });

    return score;
  };

  /* ------------------ END QUIZ ------------------ */
  const endQuiz = () => {
    setStarted(false);

    const finalAnswers = [...storedAnswers, selectedOptions];
    localStorage.setItem('answers', JSON.stringify(finalAnswers));

    const score = checkAnswers();

    const result = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      totalqs: quizData.length,
      result: score,
    };

    const finalResults = [...storedResults, result];
    localStorage.setItem('results', JSON.stringify(finalResults));

    navigate('/Results');
  };

  /* ------------------ RENDER ------------------ */
  return (
    <div className="user-container">

      {!started ? (
        <button onClick={startQuiz} className="start-btn">
          Start Quiz
        </button>
      ) : (
        <div className="quiz-wrapper">

          <div className="timer">
            Time Left: {time} seconds
          </div>

          <div className="question">
            {quizData[qsIndex]?.question}
          </div>

          <form className="options">
            {['option1', 'option2', 'option3', 'option4'].map((opt, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`q${qsIndex}`}
                  checked={selectedOptions[qsIndex] === opt}
                  onChange={() => handleOptionChange(qsIndex, opt)}
                />
                <span>{quizData[qsIndex]?.[opt]}</span>
              </label>
            ))}
          </form>

          <div className="action-buttons">
            <button
              onClick={skipQuestion}
              disabled={disableNext}
              className="next-btn"
            >
              Next
            </button>

            <button
              onClick={endQuiz}
              disabled={disableSubmit}
              className="submit-btn"
            >
              Submit
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default UserDashboard;
