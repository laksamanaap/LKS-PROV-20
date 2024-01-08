import React, { useEffect, useState } from "react";
import { UseNavigate, Outlet, Link, useNavigate } from "react-router-dom";
import client from "../utils/router";

export const Login = () => {
  const navigate = useNavigate();

  // Message
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle file input
  const handleFileInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle store login
  const handleStoreLogin = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await client.post("/users/auth", payload);
      console.log(response?.data);
      localStorage.setItem("token", response?.data.data.access_token.token);
      localStorage.setItem("id_user", response?.data.data.user.id);
      localStorage.setItem("username", response?.data.data.user.username);
      setSuccessMessage("Login Success!");
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 2000);
    } catch (err) {
      setErrorMessage(err?.response.data.error);
      console.log(err?.response.data.error);
    }
  };

  return (
    <main class="container" className="register">
      <div class="register-card">
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleStoreLogin}>
          <div class="form-group mb-4">
            <label for="exampleInputEmail1" class="mb-2">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Username"
              name="username"
              onChange={handleFileInputChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="mb-2">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={handleFileInputChange}
            />
          </div>
          <button type="submit" class="btn btn-primary mt-4 w-100">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};
