import React, { useEffect, useState } from "react";
import { UseNavigate, Outlet, Link, useNavigate } from "react-router-dom";

export const AdminSkin = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    localStorage.removeItem("username");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="core">
      <div class="d-flex flex-column  p-3 text-white bg-dark sidebar">
        <a
          href="https://getbootstrap.com/"
          class="d-flex align-items-center mb-3 mb-md-0  text-white text-decoration-none "
        >
          <svg class="bi me-2" width="40" height="32"></svg>
          <span class="fs-4">Football App</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li>
            <a href="/user-dashboard" class="nav-link text-white">
              <svg class="bi me-2" width="16" height="16"></svg>
              User
            </a>
          </li>
          <li>
            <a href="/player-dashboard" class="nav-link text-white">
              <svg class="bi me-2" width="16" height="16"></svg>
              Player
            </a>
          </li>
          <li>
            <button
              class="nav-link text-white"
              onClick={(e) => handleLogout(e)}
            >
              <svg class="bi me-2" width="16" height="16"></svg>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
