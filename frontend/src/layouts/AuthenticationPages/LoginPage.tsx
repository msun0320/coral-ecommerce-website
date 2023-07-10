import { useState } from "react";
import LoginRequestModel from "../../models/LoginRequestModel";
import { Link, useHistory } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const loginRequestModel = new LoginRequestModel(username, password);
    const url: string = `${process.env.REACT_APP_API}/auth/login`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequestModel),
    };

    const loginResponse = await fetch(url, requestOptions);
    if (!loginResponse.ok) {
      setError("Unable to log in");
      return;
    }

    const loginResponseJson = await loginResponse.json();
    if (loginResponseJson.jwt) {
      localStorage.setItem("jwt", JSON.stringify(loginResponseJson.jwt));
    }

    setError("");

    history.push("/home");
    window.location.reload();
  };

  return (
    <div className="login">
      <div className="container-fluid mt-5">
        <form
          onSubmit={handleLogin}
          className="p-4 border rounded shadow m-auto"
        >
          <h3 className="text-center mb-3">Login</h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              Don't have an account yet?{" "}
              <Link to="/register" className="text-black">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
