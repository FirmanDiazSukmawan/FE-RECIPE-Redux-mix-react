import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavbarHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <header id="navbarHome">
      <nav className="navbar navbar-expand-lg bg-transparent d-flex">
        <div className="container-fluid">
          <div className=" container d-flex flex-row ml-">
            <button
              className=" navbar-toggler bg-secondary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarNavAltMarkup"
            >
              <div className="navhome navbar-nav">
                <Link
                  className="navhome nav nav-link"
                  aria-current="page"
                  to="/"
                  // style={{ marginLeft: "-5em", marginRight: "5em" }}
                >
                  Home
                </Link>
                <Link
                  className="navadd nav nav-link"
                  to="/addRecipe"
                  // style={{ marginRight: "5em" }}
                >
                  Add recipes
                </Link>
                <Link className="nav nav-link" to="/Profile">
                  Profile
                </Link>
              </div>

              <div
                className="logout"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link className="nav-link" to="/profile">
                  <i className="bi bi-person-fill" style={{ fontSize: 52 }}></i>
                </Link>
                <Link className="nav-link" to="/login">
                  <button
                    onClick={handleLogout}
                    className="btn"
                    style={{ marginLeft: "0.5em" }}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavbarHome;
