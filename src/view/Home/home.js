import React, { useEffect, useState } from "react";
// import Button from "../../Component/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Component/footer/footer";
import { url } from "../../Component/login/login";
import { Pagination } from "react-bootstrap";
import NavbarLogin from "../../Component/Navbar/navbarLogin";
import NavbarHome from "../../Component/NavbarHome/navbarHome";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe, recipeSelector } from "../../redux/reducer/RecipeSlice";

const Home = () => {
  // const [data, SetData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const RecipePerPage = 6;
  const dispatch = useDispatch();
  const recipe = useSelector(recipeSelector);
  const [loading, setLoading] = useState(true);

  // console.log(recipe);

  useEffect(() => {
    dispatch(getRecipe());
    setLoading(false);
  }, [dispatch]);
  // console.log(recipe.data);

  const handleRecipeClick = (recipes_id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/detailRecipe/${recipes_id}`);
    }
  };

  const indexOfLastRecipe = currentPage * RecipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - RecipePerPage;
  const currentRecipe = recipe?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLoading(false);
  };

  const login = localStorage.getItem("token");
  const handleClick = async (e) => {
    navigate("/search");
  };

  return (
    <>
      {!login ? <NavbarLogin /> : <NavbarHome />}
      {/* <navbarLogin /> */}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      ) : (
        <section id="Home">
          <div className="container-fluid my-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6  col-md-12 ">
                  <h1 className="awal">Discover Recipe &amp; Delicious Food</h1>
                  <div className="button-search position-relative">
                    <input
                      className="form-control border-2 bg-body-secondary my-3"
                      placeholder="Search Restaurant, Food"
                      style={{
                        width: "33.5vw",
                        height: "4.5vh",
                        paddingLeft: "3vw",
                      }}
                      onClick={handleClick}
                    />
                    <i
                      className="bi bi-search"
                      style={{
                        position: "absolute",
                        top: "1vh",
                        paddingLeft: "1vw",
                      }}
                    ></i>
                  </div>
                </div>
                <div className="col-lg-5 offset-lg-1  col-md-12">
                  <img
                    src={require("../../asset/image/Rectangle 313.png")}
                    alt=""
                    className="zero img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid my-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="pop">Popular For You !</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid my-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6  col-md-12 ">
                  <img
                    src={require("../../asset/image/contoh foto 2.png")}
                    alt=""
                    className="first img-fluid"
                  />
                </div>
                <div className="col-md-12 col-lg-5 offset-lg-1">
                  <h1 className="h1">Healthy Fried Rice (Quick &amp; Easy)</h1>
                  <p className="p1">
                    Quick + Easy Fried Rice with Chicken Very yummy
                  </p>
                  <button className="btn btn-warning">
                    {" "}
                    <Link to="#">Learn More</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="container-fluid my-5 mx-auto ">
          <div className="row align-items-center">
            <div className=" col-md-12 col-lg-5 offset-lg-1">
              <img
                src={require("../../asset/image/contoh foto 2.png")}
                alt=""
                className="first img-fluid"
              />
            </div>
            <div className="col-md-12 col-lg-5 offset-lg-1">
              <h1 className="h1">Healthy Fried Rice (Quick &amp; Easy)</h1>
              <p className="p1">
                Quick + Easy Fried Rice with Chicken Very yummy
              </p>
              <button className="btn btn-warning">
                {" "}
                <Link to="#">Learn More</Link>
              </button>
            </div>
          </div>
        </div> */}
          <div className="container-fluid my-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="pop">New Recipe</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid my-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6  col-md-12 ">
                  <img
                    src={require("../../asset/image/contoh foto 3.png")}
                    alt=""
                    className="second img-fluid"
                  />
                </div>
                <div className="col-md-12 col-lg-5 offset-lg-1">
                  <h1 className="h1">
                    Healthy Bone Broth Ramen (Quick &amp; Easy)
                  </h1>
                  <p className="p1">
                    Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen
                    in a hurry? That’s right!
                  </p>
                  <button className="btn btn-warning">
                    <Link to="detailVideo">Learn More</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="container-fluid my-5">
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-5 offset-lg-1">
              <img
                src={require("../../asset/image/contoh foto 3.png")}
                alt=""
                className="second img-fluid"
              />
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h1 className="h1">
                Healthy Bone Broth Ramen (Quick &amp; Easy)
              </h1>
              <p className="p1">
                Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in
                a hurry? That’s right!
              </p>
              <button className="btn btn-warning">
                <Link to="detailVideo">Learn More</Link>
              </button>
            </div>
          </div>
        </div> */}
          <div className="container-fluid my-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="pop">Popular Recipe</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                {currentRecipe?.map((item) => (
                  <div className="col">
                    <div
                      className="card my-2"
                      // style={{ width: 400, height: 400 }}
                      onClick={() => handleRecipeClick(item.recipes_id)}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          backgroundColor: "rgba(200, 204, 204, 0.3)",
                        }}
                      />
                      <img
                        src={item.image}
                        className="card-img "
                        id="cardimg"
                        alt="..."
                        // style={{ width: 400, height: 400, objectFit: "cover" }}
                      />
                      <div className="card-img-overlay">
                        <h5
                          className="card-title position-absolute bottom-0"
                          style={{
                            color: "#3F3A3A",
                            fontFamily: "Airbnb Cereal App",
                            fontSize: 32,
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            zIndex: 1,
                          }}
                        >
                          {item.name_recipes}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  {Array.from({
                    length: Math.ceil(recipe?.length / RecipePerPage),
                  }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </section>
      )}
    </>

    // <>
    //     {url.map((item, index) => (
    //         <React.Fragment>
    //             <h1 key={index}>
    //                 hello
    //                 {item.username}
    //             </h1>
    //             <h1>{item.image}</h1>
    //             <Button size={100} person={{
    //                 name: "Katsuko Saruhashi",
    //                 imageId: "1"
    //             }} />
    //         </React.Fragment>
    //     ))}

    // </>
  );
};

export default Home;
