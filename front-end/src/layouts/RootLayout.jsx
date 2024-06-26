import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getCurrentUser from "../utils/currentUser.js";

// logo
import logo from "../assets/logo.svg";

//bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// styles
import "./style.css";

const HomeIconSVG = () => (
  <svg
    className="icon-margin-right"
    width="24"
    height="24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.219 0.220341C9.28867 0.150496 9.37143 0.0950815 9.46255 0.0572719C9.55367 0.0194622 9.65135 0 9.75 0C9.84865 0 9.94633 0.0194622 10.0375 0.0572719C10.1286 0.0950815 10.2113 0.150496 10.281 0.220341L19.281 9.22034C19.3506 9.29012 19.4058 9.37293 19.4433 9.46404C19.4809 9.55516 19.5002 9.65278 19.5 9.75134V20.2513C19.5 20.4503 19.421 20.641 19.2803 20.7817C19.1397 20.9223 18.9489 21.0013 18.75 21.0013H12C11.8011 21.0013 11.6103 20.9223 11.4697 20.7817C11.329 20.641 11.25 20.4503 11.25 20.2513V14.2513H8.25V20.2513C8.25 20.4503 8.17098 20.641 8.03033 20.7817C7.88968 20.9223 7.69891 21.0013 7.5 21.0013H0.750001C0.551089 21.0013 0.360323 20.9223 0.219671 20.7817C0.0790188 20.641 1.19624e-06 20.4503 1.19624e-06 20.2513V9.75134C-0.000174824 9.65278 0.0190762 9.55516 0.0566537 9.46404C0.0942313 9.37293 0.149399 9.29012 0.219001 9.22034L9.219 0.220341ZM1.5 10.0618V19.5013H6.75V13.5013C6.75 13.3024 6.82902 13.1117 6.96967 12.971C7.11032 12.8304 7.30109 12.7513 7.5 12.7513H12C12.1989 12.7513 12.3897 12.8304 12.5303 12.971C12.671 13.1117 12.75 13.3024 12.75 13.5013V19.5013H18V10.0618L9.75 1.81184L1.5 10.0618Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.25 2.25146V7.50146L14.25 4.50146V2.25146C14.25 2.05255 14.329 1.86179 14.4697 1.72113C14.6103 1.58048 14.8011 1.50146 15 1.50146H16.5C16.6989 1.50146 16.8897 1.58048 17.0303 1.72113C17.171 1.86179 17.25 2.05255 17.25 2.25146Z"
      fill="currentColor"
    />
  </svg>
);

const SearchIconSVG = () => (
  <svg
    className="icon-margin-right"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.6611 15.6633C15.8005 15.5238 15.9659 15.4132 16.148 15.3377C16.3301 15.2622 16.5253 15.2234 16.7224 15.2234C16.9195 15.2234 17.1147 15.2622 17.2968 15.3377C17.4789 15.4132 17.6443 15.5238 17.7836 15.6633L23.5586 21.4383C23.8401 21.7196 23.9983 22.1011 23.9985 22.499C23.9986 22.8969 23.8407 23.2786 23.5594 23.5601C23.2781 23.8415 22.8966 23.9997 22.4987 23.9999C22.1008 24 21.7191 23.8421 21.4376 23.5608L15.6626 17.7858C15.5232 17.6465 15.4125 17.4811 15.3371 17.299C15.2616 17.1169 15.2227 16.9217 15.2227 16.7246C15.2227 16.5274 15.2616 16.3322 15.3371 16.1501C15.4125 15.968 15.5232 15.8026 15.6626 15.6633H15.6611Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.75 18C10.8334 18 11.9062 17.7866 12.9071 17.372C13.9081 16.9574 14.8175 16.3497 15.5836 15.5836C16.3497 14.8175 16.9574 13.9081 17.372 12.9071C17.7866 11.9062 18 10.8334 18 9.75C18 8.66659 17.7866 7.5938 17.372 6.59286C16.9574 5.59193 16.3497 4.68245 15.5836 3.91637C14.8175 3.15029 13.9081 2.5426 12.9071 2.12799C11.9062 1.71339 10.8334 1.5 9.75 1.5C7.56196 1.5 5.46354 2.36919 3.91637 3.91637C2.36919 5.46354 1.5 7.56196 1.5 9.75C1.5 11.938 2.36919 14.0365 3.91637 15.5836C5.46354 17.1308 7.56196 18 9.75 18ZM19.5 9.75C19.5 12.3359 18.4728 14.8158 16.6443 16.6443C14.8158 18.4728 12.3359 19.5 9.75 19.5C7.16414 19.5 4.68419 18.4728 2.85571 16.6443C1.02723 14.8158 0 12.3359 0 9.75C0 7.16414 1.02723 4.68419 2.85571 2.85571C4.68419 1.02723 7.16414 0 9.75 0C12.3359 0 14.8158 1.02723 16.6443 2.85571C18.4728 4.68419 19.5 7.16414 19.5 9.75Z"
      fill="currentColor"
    />
  </svg>
);

const UploadSVG = () => (
  <svg
    className="icon-margin-right"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 16v2h14v-2h2v2c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-2h2zm7-14l-6 6h4v6h4v-6h4l-6-6z" />
  </svg>
);

const PanelSVG = () => (
  <svg
    className="icon-margin-right"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
  </svg>
);

export default function RootLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user); // Setting the user state
  }, []);
  console.log(user);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app-container d-flex" style={{ marginLeft: "280px" }}>
      <div
        className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{
          width: "280px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
        }}
      >
        <NavLink
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img src={logo} alt="Logo" width="180" height="42" className="me-2" />
        </NavLink>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active text-white" : "nav-link text-white"
              }
            >
              <HomeIconSVG />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "nav-link active text-white" : "nav-link text-white"
              }
            >
              <SearchIconSVG />
              Search Courses
            </NavLink>
          </li>

          {user?.role === "content_creator" && (
            <li>
              <NavLink
                to="/videoupload"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active text-white"
                    : "nav-link text-white"
                }
              >
                <UploadSVG />
                Video Upload
              </NavLink>
            </li>
          )}

          {user?.role === "content_creator" && ( //the margins are all messed up
            <li>
              <NavLink
                to="/creatorPanel"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active text-white"
                    : "nav-link text-white"
                }
              >
                <PanelSVG />
                Creator Panel
              </NavLink>
            </li>
          )}
        </ul>
        <hr />

        {isLoggedIn() ? (
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user?.avatar}
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{user?.username}</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={signOut}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <NavLink to="/register" className="text-white">
              SignUp
            </NavLink>{" "}
            or{" "}
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
          </div>
        )}
        {/* USER SECTION */}
      </div>
      <Outlet />
    </div>
  );
}
