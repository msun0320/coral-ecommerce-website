import { useState } from "react";
import LoginRequestModel from "../../models/LoginRequestModel";
import { Link, useHistory } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const loginRequestModel = new LoginRequestModel(username, password);
    const url: string = "http://localhost:8080/api/auth/login";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequestModel),
    };

    const loginResponse = await fetch(url, requestOptions);
    if (!loginResponse.ok) {
      throw new Error("Something went wrong!");
    }

    const loginResponseJson = await loginResponse.json();
    if (loginResponseJson.jwt) {
      localStorage.setItem("jwt", JSON.stringify(loginResponseJson.jwt));
    }

    history.push("/home");
    window.location.reload();
  };

  return (
    <div>
      <div className="container-fluid">
        <form onSubmit={handleLogin}>
          <div>
            <h3>Login</h3>
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </div>
        </form>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};
