import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarHome from "../NavbarHome/navbarHome";
import Footer from "../footer/footer";
import { url } from "../login/login";
import { toast } from "react-toastify";

function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`${url}/recipe/?sort=ASC&search=${search}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []); //

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRecipeClick = (recipes_id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/detailRecipe/${recipes_id}`);
    }
  };

  return (
    <>
      <NavbarHome />

      <div className="col d-flex justify-content-center align-items-center flex-column ">
        <div className="button-search position-relative ">
          <input
            className="form-control border-2 bg-body-secondary my-3"
            placeholder="Search Restaurant, Food"
            style={{
              width: "33.5vw",
              height: "4.5vh",
              paddingLeft: "3vw",
            }}
            name="search"
            onKeyDown={handleKeyDown}
            value={search}
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <i
            className="bi bi-search"
            style={{
              position: "absolute",
              top: "2.5vh",
              paddingLeft: "1vw",
            }}
          ></i>
          {/* <button className="btn btn-dark" onClick={handleSearch}>
            button
          </button> */}
        </div>
      </div>
      <div className="container" id="search" style={{ minHeight: "32vh" }}>
        <div className="row">
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          ) : (
            data.map((item) => (
              <div className="col" id="search" key={item.recipes_id}>
                <div
                  className="card my-2"
                  style={{ width: 400, height: 400, cursor: "pointer" }}
                  onClick={() => handleRecipeClick(item.recipes_id)}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backgroundColor: "rgba(200, 204, 204, 0.4)",
                    }}
                  />
                  <img
                    src={item.image}
                    className="card-img "
                    id="cardimg"
                    alt="..."
                    style={{ width: 400, height: 400, objectFit: "cover" }}
                  />
                  <div className="card-img-overlay">
                    <h5
                      className="card-title position-absolute bottom-0"
                      style={{
                        color: "#3F3A3A",
                        fontFamily: "Airbnb Cereal App",
                        fontSize: 32,
                        textTransform: "capitalize",
                        zIndex: 2,
                      }}
                    >
                      {item.name_recipes}
                    </h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Search;
