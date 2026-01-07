import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Reusable UI components */
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

/*
  Login Page
  Purpose:
  - Authenticate existing users (mock auth)
  - Provide a calm, trustworthy login experience
  - UI-focused refinement (no logic changes)
*/
const Login = () => {
  const navigate = useNavigate();

  // Local form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // If user is not registered
    if (!storedUser) {
      alert("Account not found. Please sign up first.");
      return;
    }

    // Validate credentials
    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("authUser", JSON.stringify({ email }));
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      {/* Page title */}
      <PageHeader title="Login" />

      {/* Centered login card */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <Card className="p-4 p-md-5">
              {/* Heading */}
              <h3 className="mb-2">Welcome back</h3>
              <p className="text-muted mb-4">
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

              {/* Secondary action */}
              <div className="text-center">
                <small>
                  Don’t have an account?{" "}
                  <Link to="/auth?mode=signup">Create an account</Link>
                </small>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
