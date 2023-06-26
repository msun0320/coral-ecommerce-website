import { useState } from "react";
import RegistrationRequestModel from "../../models/RegistrationRequestModel";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const registrationRequestModel = new RegistrationRequestModel(
      username,
      email,
      password
    );
    const url = "http://localhsost:8080/api/auth/register";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationRequestModel),
    };

    const loginResponse = await fetch(url, requestOptions);
    if (!loginResponse.ok) {
      throw new Error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <form onSubmit={handleRegister}>
          <div>
            <h3>Register</h3>
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control mt-1"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                maxLength={32}
                pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
