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
  Signup Page
  Purpose:
  - Register a new user (mock auth)
  - Treat signup as authenticated session
  - Reset cart & orders for fresh user state
*/
const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    // Save new user
    localStorage.setItem("user", JSON.stringify(formData));

    // Reset previous user data (critical for isolation)
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");

    // Mark session as logged in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "authUser",
      JSON.stringify({ email: formData.email })
    );

    navigate("/");
  };

  return (
    <>

      {/* Centered auth layout */}
      <div className="auth-page">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <Card className="p-4 p-md-5 auth-card">
            {/* Card heading */}
            <h3 className="auth-title">Create your account</h3>
            <p className="auth-subtitle">
              Join us to start exploring great books.
            </p>

            {/* Signup form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-100 mb-3"
                disabled={!formData.email || !formData.password}
              >
                Sign up
              </Button>
            </form>

            {/* Secondary navigation */}
            <div className="text-center auth-footer">
              <small>
                Already have an account?{" "}
                <Link to="/auth?mode=login">Login</Link>
              </small>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
