import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

    // API call to create the user. If successful, sign in the user and redirect to the home page
    // If the api call returns a 400 status code, set the errors state
    // If there is a server error, redirect to the error page
    try {
      const res = await api('/users', 'POST', user);
      if (res.status === 201) {
          await actions.signIn({
            username: emailAddress.current.value,
            password: password.current.value
          });
          navigate('/');
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        { errors.length ? <ErrorsDisplay errors={errors}/> : null }
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            ref={firstName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            ref={lastName}
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input 
            id="emailAddress" 
            name="emailAddress" 
            type="email" 
            ref={emailAddress}
          />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            ref={password}
          />
          
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
}

export default UserSignIn;