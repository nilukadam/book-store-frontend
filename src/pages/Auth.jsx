import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Auth = () => {
  const navigate = useNavigate();

  // toggle between login & signup
  const [mode, setMode] = useState("login");

  // common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup-only field
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      if (!name || !email || !password) {
        alert("All fields are required");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ name, email, password })
      );

      localStorage.setItem(
        "authUser",
        JSON.stringify({ email })
      );

      navigate("/");
    }

    if (mode === "login") {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        alert("Account not found. Please sign up first.");
        return;
      }

      if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem(
          "authUser",
          JSON.stringify({ email })
        );
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h3 className="mb-3 text-center">
        {mode === "login" ? "Login" : "Signup"}
      </h3>

      {/* Toggle buttons */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        <Button
          variant={mode === "login" ? "primary" : "outline"}
          onClick={() => setMode("login")}
        >
          Login
        </Button>

        <Button
          variant={mode === "signup" ? "primary" : "outline"}
          onClick={() => setMode("signup")}
        >
          Signup
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

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
          className="w-100"
          disabled={!email || !password || (mode === "signup" && !name)}
        >
          {mode === "login" ? "Login" : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
