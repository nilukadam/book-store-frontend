import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import api from "../api/api";


import "../style/Auth.css";

const Signup = () => {
  /* -------------------- HOOKS -------------------- */
  const navigate = useNavigate();
  const { login } = useAuth();

  /* -------------------- STATE -------------------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password } = formData;

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    await api.post("/auth/register", {
      name,
      email,
      password,
    });

    alert("Account created successfully");

    navigate("/auth");
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  }
};

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="auth-page">
      <div className="col-12 col-sm-10 col-md-8 col-lg-5">
        <Card className="p-4 p-md-5 auth-card">
          <h3 className="auth-title">Create your account</h3>
          <p className="auth-subtitle">
            Join us to start exploring great books.
          </p>

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

          <div className="text-center auth-footer">
            <small>
              Already have an account?{" "}
              <Link to="/auth?mode=login">
                Login
              </Link>
            </small>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
