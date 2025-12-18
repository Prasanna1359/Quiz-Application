import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";   // reuse same CSS

const Login = () => {

  const [logindata, setLogindata] = useState({
    email: '',
    password: '',
  });

  const { email, password } = logindata;

  const changeHandler = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  const [loginEmail, setLoginEmail] = useState("");
  let [finalData, setFinaldata] = useState([]);

  useEffect(() => {
    const idata = JSON.parse(localStorage.getItem('Data')) || [];
    setFinaldata(idata);
  }, []);

  const emailExist = finalData.find(user => user.email === email);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (emailExist) {
      if (emailExist.password === password) {
        alert("Login successfully");

        setLoginEmail(email);

        if (emailExist.panel === "admin") {
          navigate('/AdminDashboard', {
            state: {
              data: {
                firstname: emailExist.firstname,
                lastname: emailExist.lastname
              }
            }
          });
        }

        if (emailExist.panel === "user") {
          navigate('/UserDashboard', {
            state: {
              data: {
                email: emailExist.email,
                firstname: emailExist.firstname,
                lastname: emailExist.lastname
              }
            }
          });
        }

        setLogindata({ email: '', password: '' });

      } else {
        alert("Password doesn't match");
      }
    } else {
      alert("Email doesn't exist");
    }
  };

  localStorage.setItem('loginEmail', JSON.stringify(loginEmail));

  return (
    <form onSubmit={submitHandler} className="register-form">

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          required
        />
      </div>

      <input type="submit" value="Login" className="submit-btn" />

    </form>
  );
};

export default Login;
