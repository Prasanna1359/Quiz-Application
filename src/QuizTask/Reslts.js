import React, { useEffect, useState } from 'react';
import "./Results.css";

const Reslts = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const email = JSON.parse(localStorage.getItem('loginEmail')) || "";

    const userResult = results.find(r => r.email === email);
    setResult(userResult || null);
  }, []);

  if (!result) {
    return <h2 style={{ textAlign: "center" }}>Result not found</h2>;
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <h1>Quiz Result</h1>

        <p className="user-name">
          {result.firstname} {result.lastname}
        </p>

        <div className="score-box">
          <span>Your Score</span>
          <h2>{result.result} / {result.totalqs}</h2>
        </div>

        <p className="percentage">
          Percentage: {Math.round((result.result / result.totalqs) * 100)}%
        </p>
      </div>
    </div>
  );
};

export default Reslts;
