import { useSearchParams } from "react-router-dom";

/* Auth screens */
import Login from "./Login";
import Signup from "./Signup";

/*
  Auth Page
  Purpose:
  - Single entry point for authentication
  - Decide Login / Signup based on URL query
*/
const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return mode === "signup" ? <Signup /> : <Login />;
};

export default Auth;
