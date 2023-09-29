import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { actions } = useContext(UserContext);

  // State
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    const from = location.state ? location.state.from : '/';

    const credentials = {
      username: emailAddress.current.value,
      password: password.current.value
    }

    // API call to sign in the user. If successful, redirect to the previous page
    // If the user is not found, set the errors state
    try {
      const user = await actions.signIn(credentials);
      user ? navigate(from) : setErrors(['Sign-in was unsuccessful']);
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
          { // Conditional rendering of the ErrorsDisplay component
            errors.length ? <ErrorsDisplay errors={errors}/> : null }
          <form onSubmit={handleSubmit}>
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
            <button className="button" type="submit">Sign in</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </form>
        <p>
          Don't have a user account? Click here to <Link to="/signup"> sign up</Link>!
        </p>
      </div>
    </main>
  );
}

export default UserSignIn;