import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css";


const Register = () => {
   
    const [data,setData] = useState({
        
        'firstname':'',
        'lastname':'',
        'email':'',
        'password':'',
        'panel':'admin',
        'id':'',
    })

        const navigate = useNavigate()
    
    
    const [confirmPassword,setConfirmPassword] = useState('') 

    const pswrdregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    let [finalData,setFinaldata]= useState([])

    let errorMessage = "password should contain"

    useEffect(() => {
        const idata = JSON.parse(localStorage.getItem('Data')) || [];
        setFinaldata(idata)
    },[])

    const {firstname,lastname,email,password,panel ,id} = data;

    const changeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value,'id': Math.floor(Math.random() *1000)+1})
    }

     const submitHandler =(e) => {
        e.preventDefault()

     if(!(finalData.some(user => user.email === email)))
        {
           
         if (pswrdregex.test(password)) {
        
        if(confirmPassword === password)
        {

            alert("registered successfully")
            finalData =[...finalData,data]
        localStorage.setItem('Data',JSON.stringify(finalData))
        
        setFinaldata(JSON.parse(localStorage.getItem('Data')))
          
        setData({
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            panel:'',
            id:'',
        })
        setConfirmPassword("")
         navigate('/Login')

        }
        else{
            alert("passwords doesn't match")
        }
    } 
    
    else{
        
        if (!(password.length >= 8)) {
            errorMessage += "  more than 8 characters  ";
        }
        if (!(/[A-Z]/.test(password))) {
            errorMessage += " a capital letter  ";

        }
        if (!(/[a-z]/.test(password))) {
            errorMessage += " small letters  ";

        }
        if (!(/[0-9]/.test(password))) {
            errorMessage += " a  digit. ";

        }
        if (!(/[@$!%*?&]/.test(password))) {
           errorMessage += " a special character. ";

        }
       alert(errorMessage);

    }
        
}
    else{
       
        alert("email already exists")
        setData({
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            panel:'',
            id:'',
        })
        setConfirmPassword("")
    }

     }
    

  return (
    <>
     <form onSubmit={submitHandler} className="register-form">

  {/* Row 1 */}
  <div className="form-row">
    <div className="form-group">
      <label>First Name</label>
      <input
        type="text"
        name="firstname"
        value={firstname}
        onChange={changeHandler}
        required
      />
    </div>

    <div className="form-group">
      <label>Last Name</label>
      <input
        type="text"
        name="lastname"
        value={lastname}
        onChange={changeHandler}
        required
      />
    </div>
  </div>

  {/* Row 2 */}
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

  {/* Row 3 */}
  <div className="form-row">
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

    <div className="form-group">
      <label>Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>
  </div>

  {/* Row 4 */}
  <div className="form-group">
    <label>Panel</label>
    <select name="panel" value={panel} onChange={changeHandler} required>
      <option value="Admin">Admin</option>
      <option value="user">User</option>
    </select>
  </div>

  {/* Row 5 */}
  <input type="submit" value="Register" className="submit-btn" />

</form>



    </>
  )
}

export default Register