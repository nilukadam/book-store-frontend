import React from "react";
import { useSearchParams } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  /* -------------------- QUERY PARAMS -------------------- */
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  /* -------------------- RENDER -------------------- */
  return mode === "signup" ? <Signup /> : <Login />;
};

export default Auth;
