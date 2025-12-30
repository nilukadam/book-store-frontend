import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";


/*
  Login page component.
  Responsibilities:
  - Authenticate existing users (mock authentication)
  - Validate credentials against localStorage
  - Update login state
  - Redirect user after successful login
*/
const Login = () => {
  const navigate = useNavigate();

  /*
    State to manage login form inputs.
    These are controlled inputs.
  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*
    Handles login form submission.
    - Prevents default form reload
    - Checks stored user data
    - Validates credentials
    - Updates authentication state
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      Retrieve registered user data from localStorage.
      This simulates backend user lookup.
    */
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      alert('No user found. Please sign up first.');
      return;
    }

    /*
      Validate entered credentials.
      If matched, mark user as logged in.
    */
    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/*
        Login form with controlled inputs.
        onSubmit triggers authentication logic.
      */}
      <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        disabled={!email || !password}
      >
       Login
      </Button>
        
      </form>
    </div>
  );
};

export default Login;
