import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Component/footer/footer";
import { url } from "../../Component/login/login";
import axios from "axios";
import ModalProfile from "../../Component/modalProfile";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUpdate from "../../Component/modalUpdateMyRecipe";
import { Pagination } from "react-bootstrap";
import NavbarHome from "../../Component/NavbarHome/navbarHome";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeUsersId, loadingSelector, recipeSelector } from "../../redux/reducer/RecipeSlice";
import { getUsersById, isLoadingSelector, usersSelector } from "../../redux/reducer/usersSlice";
import ModalDelete from "../../Component/modalDeleteMyRecipe";


function Profile() {
  // const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipePerPage = 6;
  // console.log(users.image);
  const getId = localStorage.getItem("userId");
  // console.log(getId);
  const dispatch = useDispatch();
  const recipe = useSelector(recipeSelector);
  const recipesArray = Array.isArray(recipe) ? recipe : [];
  const users = useSelector(usersSelector);
  const loading = useSelector(loadingSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [thisloading, setThisLoading] = useState(true)
  console.log(recipe)

  useEffect(() => {
    setThisLoading(false);
  }, [])



  useEffect(() => {
    dispatch(getUsersById(getId));
  }, [dispatch, getId])

  useEffect(() => {
    dispatch(getRecipeUsersId(getId));
  }, [dispatch, getId]);


  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const currentRecipe = recipesArray?.slice(indexOfFirstRecipe, indexOfLastRecipe);



  // console.log(currentRecipe)

  const handlePageChage = (PageNumber) => {
    setCurrentPage(PageNumber);
  };

  return (
    <>
      <ToastContainer />
      <NavbarHome />
      {thisloading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>


      ) : (
        <section id="profile" style={{ minHeight: "90vh" }}>
          {isLoading ? ("loading...") : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg d-flex  flex-column align-items-center">
                  <div className=" position-relative">
                    <img
                      src={users?.image}
                      alt="user foto"
                      className="fotoprofile"
                    />
                    <ModalProfile />
                  </div>
                  <h1 className="nameprofile">{users?.username}</h1>
                </div>
              </div>
            </div>
          )}
          <div className="container">
            <Tabs
              defaultActiveKey="MyRecipe"
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey="MyRecipe"
                title="MyRecipe"
                style={{ height: "auto" }}
              >
                <div className="container">
                  <div className="row row-cols-1 row-cols-md-3 g-4 ">
                    {loading ? ("loading...") : (currentRecipe?.map((item) => (
                      <div className="col" key={item.recipes_id}>
                        <div
                          className="card "
                          style={{ width: 370, height: 250 }}
                        >
                          <img
                            src={item.image}
                            className="card-img "
                            alt="..."
                            style={{
                              width: 370,
                              height: 250,
                              objectFit: "cover",
                            }}
                          />
                          <div className="card-img-overlay">
                            <h5
                              className="card-title position-absolute bottom-0"
                              style={{
                                color: "#fff",
                                fontFamily: "Airbnb Cereal App",
                                fontSize: 28,
                                textTransform: "capitalize",
                              }}
                            >
                              {item.name_recipes}
                            </h5>
                            <ModalUpdate item={item}
                              recipeId={item.recipes_id}
                            />
                            <ModalDelete item={item} />
                          </div>
                        </div>
                      </div>
                    )))}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      {Array.from({
                        length: Math.ceil(recipe?.length / recipePerPage),
                      }).map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChage(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Saved Recipe" title="Saved Recipe">
                <div className="container">
                  <div className="row row-cols-1 row-cols-md-3 g-4 ">
                    {currentRecipe?.map((item) => (
                      <div className="col" key={item.recipes_id}>
                        <div
                          className="card "
                          style={{ width: 370, height: 250 }}
                        >
                          <img
                            src={item.image}
                            className="card-img "
                            alt="..."
                            style={{
                              width: 370,
                              height: 250,
                              objectFit: "cover",
                            }}
                          />
                          <div className="card-img-overlay">
                            <h5 className="card-title position-absolute bottom-0">
                              {item.name_recipes}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Liked Recipe" title="Liked Recipe">
                <div className="container">
                  <div className="row row-cols-1 row-cols-md-3 g-4 ">
                    {currentRecipe?.map((item) => (
                      <div className="col" key={item.recipes_id}>
                        <div
                          className="card "
                          style={{ width: 370, height: 250 }}
                        >
                          <img
                            src={item.image}
                            className="card-img "
                            alt="..."
                            style={{
                              width: 370,
                              height: 250,
                              objectFit: "cover",
                            }}
                          />
                          <div className="card-img-overlay">
                            <h5 className="card-title position-absolute bottom-0">
                              {item.name_recipes}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </section>
      )}
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
