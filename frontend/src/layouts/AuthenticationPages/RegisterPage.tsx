import { useState } from "react";
import RegistrationRequestModel from "../../models/RegistrationRequestModel";
import { useHistory } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password.length < 6 || password.length > 32) {
      setError("Password must be between 6 and 32 characters");
      return;
    }

    const registrationRequestModel = new RegistrationRequestModel(
      username,
      email,
      password
    );

    const url = `${process.env.REACT_APP_API}/auth/register`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationRequestModel),
    };

    const loginResponse = await fetch(url, requestOptions);
    if (loginResponse.status === 409) {
      setError("Email already registered");
      return;
    }

    if (!loginResponse.ok) {
      throw new Error("Something went wrong!");
    }

    setError("");

    history.push("/login");
  };

  return (
    <div className="register">
      <div className="container-fluid mt-5">
        <form
          onSubmit={handleRegister}
          className="p-4 border rounded shadow m-auto"
        >
          <h3 className="text-center mb-3">Register</h3>
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={6}
              maxLength={32}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
