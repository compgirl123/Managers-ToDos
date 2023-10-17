import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { fetchLogin } from '../../store/login';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { InputFieldMargin, InputIcon } from '../InputField/InputField.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

/**
 * Login Component
 * This Component contains the Code for the Login Page
 */
export const Login = (props) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {email,password};
    dispatch(fetchLogin(userCredentials)).then((result)=>{
      if (result.payload.error) {
        // Handle the error here
        console.log('Login failed:', result.payload.error);
        setError(true);
      } else {
         // Login was successful
        console.log('Login successful');
        localStorage.setItem('loginInfo',JSON.stringify(userCredentials));
        console.log(result.payload);
        setError(false);
        navigate('/dashboard');
      }
    });
  };

  return (
    <>
    <div className='toDoWrapper'>
      <form onSubmit={handleSubmit} className='test'>
          <h1>Login</h1>
          <InputFieldMargin
            id="email"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            icon = {faUser}
          />
          <InputIcon>
            <FontAwesomeIcon icon={faUser}/>
          </InputIcon>
          <InputFieldMargin
            id = "passwordInput"
            type = "password"
            placeholder = "Enter password"
            onChange = {(e) => setPassword(e.target.value)}
            label = "Password"
            icon = {faLock}
            value  = {password}
          />
          <InputIcon>
            <FontAwesomeIcon icon={faLock} />
          </InputIcon>
          <Button
            type='submit'
            onClick={() => console.log("Sign in!")}
            disabled={false}
          >
          Login
          </Button>
          {error && (<p>ERROR{error}</p>)}
          <div className="sign-up-link">
            <p>Dont have an account?
              <a href="#">Register</a>
            </p>
          </div>
      </form>
    </div>
    </>
  )
};

