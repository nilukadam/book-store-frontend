import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Reusable UI components */
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

/* Auth-specific styling */
import "../style/Auth.css";

/*
  Login Page
  Purpose:
  - Authenticate existing users (mock auth)
  - Maintain clean, professional UI
  - No business logic beyond basic validation
*/
const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // No registered user found
    if (!storedUser) {
      alert("Account not found. Please sign up first.");
      return;
    }

    // Validate credentials
    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("authUser", JSON.stringify({ email }));
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      
      {/* Centered auth layout */}
      <div className="auth-page">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <Card className="p-4 p-md-5 auth-card">
            {/* Card heading */}
            <h3 className="auth-title">Welcome back</h3>
            <p className="auth-subtitle">
              Log in to continue exploring books.
            </p>

            {/* Login form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-100 mb-3"
                disabled={!email || !password}
              >
                Login
              </Button>
            </form>

            {/* Secondary navigation */}
            <div className="text-center auth-footer">
              <small>
                Don’t have an account?{" "}
                <Link to="/auth?mode=signup">Create an account</Link>
              </small>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
