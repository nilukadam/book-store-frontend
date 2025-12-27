import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
  Signup page component.
  Responsibilities:
  - Register a new user (mock registration)
  - Store user data in localStorage
  - Mark user as logged in
  - Redirect user after successful signup
*/
const Signup = () => {
  const navigate = useNavigate();

  /*
    State to manage signup form inputs.
    Using a single object makes the form easy to extend later.
  */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  /*
    Handles input changes for all fields.
    Uses input 'name' attribute to update corresponding state.
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /*
    Handles signup form submission.
    - Prevents page reload
    - Performs basic validation
    - Stores user data
    - Sets authentication state
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      Basic form validation.
      Ensures no required field is empty.
    */
    if (!formData.name || !formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }

    /*
      Store user data in localStorage.
      This simulates user registration without a backend.
    */
    localStorage.setItem('user', JSON.stringify(formData));

    /*
      Mark user as logged in.
      Authentication state is stored separately from user data.
    */
    localStorage.setItem('isLoggedIn', 'true');

    /*
      Redirect user to Home page after successful signup.
    */
    navigate('/');
  };

  return (
    <div>
      <h2>Signup</h2>

      {/*
        Signup form with controlled inputs.
        onSubmit triggers registration logic.
      */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit"
         className="btn btn-primary"
         disabled={!email || !password}
         >Signup</button>
      </form>
    </div>
  );
};

export default Signup;
