import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";


const AdminDashboard = () => {
   const navigate=useNavigate()
    const [QuizData,setQuizData] = useState({
        'question':"",
        'option1':"",
        'option2':"",
        'option3':"",
        'option4':"",
        'correct':"",
    })
    const {question,option1,option2,option3,option4,correct}=QuizData;

    const [finalQuizData,setFinalQuizData]=useState([])
    useEffect(() => {
        const tempData = JSON.parse(localStorage.getItem('QuizData')) || [];
        setFinalQuizData(tempData)

    },[])
    
    const changeHandler= (e) => {
        setQuizData({...QuizData,[e.target.name]:e.target.value})
        
    }
    const submitHandler = (e) => {
        e.preventDefault();
        let finalData =[...finalQuizData,QuizData]
        localStorage.setItem('QuizData',JSON.stringify(finalData))
        
        setFinalQuizData(JSON.parse(localStorage.getItem('QuizData')))
        alert("question  added successfully")
        setQuizData({
            question:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            correct:"",
        })
    }



return (
  <div className="admin-container">

    <button onClick={() => navigate('/ResultTable')}>
      View User Scores
    </button>

    <form onSubmit={submitHandler} className="admin-form">
      <label>Enter a Question</label>
      <input type="text" name="question" value={question} onChange={changeHandler} required />

      <label>Option 1</label>
      <input type="text" name="option1" value={option1} onChange={changeHandler} required />

      <label>Option 2</label>
      <input type="text" name="option2" value={option2} onChange={changeHandler} required />

      <label>Option 3</label>
      <input type="text" name="option3" value={option3} onChange={changeHandler} required />

      <label>Option 4</label>
      <input type="text" name="option4" value={option4} onChange={changeHandler} required />

      <label>Correct Option</label>
      <select name="correct" value={correct} onChange={changeHandler} required>
        <option value="" disabled>Select correct option</option>
        <option value="option1">{option1}</option>
        <option value="option2">{option2}</option>
        <option value="option3">{option3}</option>
        <option value="option4">{option4}</option>
      </select>

      <input type="submit" value="Add Question" />
    </form>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Question</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          {finalQuizData.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.question}</td>
              <td>{value.option1}</td>
              <td>{value.option2}</td>
              <td>{value.option3}</td>
              <td>{value.option4}</td>
              <td>{value.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

}

export default AdminDashboard