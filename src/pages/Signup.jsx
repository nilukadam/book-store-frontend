import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Reusable UI components */
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

/*
  Signup Page
  Purpose:
  - Register a new user (mock auth)
  - Maintain visual consistency with Login page
  - UI-focused refinement only
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

    // Save registered user
    localStorage.setItem("user", JSON.stringify(formData));

    // Auto-login after signup
    localStorage.setItem(
      "authUser",
      JSON.stringify({ email: formData.email })
    );

    navigate("/");
  };

  return (
    <>
      {/* Page title */}
      <PageHeader title="Sign up" />

      {/* Centered signup card */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <Card className="p-4 p-md-5">
              {/* Heading */}
              <h3 className="mb-2">Create your account</h3>
              <p className="text-muted mb-4">
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

              {/* Secondary action */}
              <div className="text-center">
                <small>
                  Already have an account?{" "}
                  <Link to="/auth?mode=login">Login</Link>
                </small>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
