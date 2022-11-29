import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = window.document.body;
    body.classList.add('grey')
    return () => {
      body.classList.remove('grey')
    }
  },[])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // console.log('data: ', data)
      setEmailErrors([])
      setPasswordErrors([])
      data.forEach(error => errorMap(error));
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/questions' />;
  }

  const errorMap = (errorItem) => {
    // console.log(errorItem)
    // setEmailErrors([])
    // setPasswordErrors([])
    // split the error on :
    let errorArr = errorItem.split(":")
    // console.log(errorArr)
    // console.log(errorArr[1])
    // If the first element in the new item is "Email", set emailError to second item
    if (errorArr[0] === "email ") {
      setEmailErrors([])
      setEmailErrors([errorArr[1]])
    }
    if (errorArr[0] === "password ") {
      setPasswordErrors([])
      setPasswordErrors([errorArr[1]])
    }
    // if the first element is "Password", set passwordError to second item
  }

  // console.log('emailErrors: ', emailErrors)
  // console.log(passwordErrors)

  return (
    <div className='login-container'>
      <form id="login-form" onSubmit={onLogin}>
        {/* <div className='list-errors-parent auth-errors'>
          {errors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div> */}
        <div id="login-div-top" className='login-div'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            value={email}
            maxLength={255}
            onChange={updateEmail}
          />
        </div>
        <div className='list-errors-parent auth-errors'>
          {emailErrors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-div'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            maxLength={255}
            onChange={updatePassword}
          />
        </div>
        <div className='list-errors-parent auth-errors'>
          {passwordErrors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div>
        <button className='signup' type='submit'>Log In</button>
      </form>
      <div className='auth-otherlinks-container'>
      <p>Don't have an account? <Link className='auth-otherlinks' to="/sign-up">Sign up</Link></p>
    </div>
    </div>
  );
};

export default LoginForm;
