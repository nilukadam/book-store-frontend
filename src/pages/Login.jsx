import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // User not registered
    if (!storedUser) {
      alert("Account not found. Please sign up first.");
      return;
    }

    // Validate credentials
    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem(
        "authUser",
        JSON.stringify({ email })
      );
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>

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

        <Button type="submit" disabled={!email || !password}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
