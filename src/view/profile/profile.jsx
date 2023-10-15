import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ModalDelete from "../../Component/modalDeleteMyRecipe";
import { getLikedUsersId, getLikedUsersIdSelector } from "../../redux/reducer/liked/getLikedSlice";
import { getSavedUsersId, getSavedUsersIdSelector } from "../../redux/reducer/Saved/getSavedSlice";
import Swal from "sweetalert2";
import { deleteLiked } from "../../redux/reducer/liked/deleteLikedSlice";
import { deleteSaved } from "../../redux/reducer/Saved/deleteSavedSlice";
import { getUsersId, getUsersIdSelector } from "../../redux/reducer/users/getUsersIdSlice";


function Profile() {
  // const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipePerPage = 6;
  // console.log(users.image);
  const getId = localStorage.getItem("userId");
  // console.log(getId);
  const dispatch = useDispatch();
  const recipe = useSelector(recipeSelector);
  const users = useSelector(getUsersIdSelector);
  const usersArray = Array.isArray(users?.data) ? users?.data : [users?.data];
  const loading = useSelector(loadingSelector);
  const [thisloading, setThisLoading] = useState(true)  
  const like = useSelector(getLikedUsersIdSelector);
  const saved = useSelector (getSavedUsersIdSelector) 
  const navigate = useNavigate()

  useEffect(() => {
    setThisLoading(false);
  }, [])

  console.log(usersArray)


  useEffect(() => {
    dispatch(getUsersId(getId));
    setThisLoading(false)
  }, [dispatch, getId])

  useEffect(() => {
    dispatch(getRecipeUsersId(getId));
    setThisLoading(false)
  }, [dispatch, getId]);

  useEffect(() => {
    dispatch(getLikedUsersId(getId))
    setThisLoading(false)
  },[dispatch,getId])

  useEffect(()=>{
    dispatch(getSavedUsersId(getId))
    setThisLoading(false)
  },[dispatch,getId])


  const handleDeleteLike = async(liked_id) => {
    const result = await Swal.fire({
      title: 'Delete Product',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545', 
    });

    if (result.isConfirmed){
      try {
        await (dispatch(deleteLiked(liked_id)))
        
        dispatch(getLikedUsersId(getId))
      }
      catch  (err){
        console.log("delete failed: " + err)
      }
    }
  }

  const handleDeleteSaved = async(saved_id) => {
    const result = await Swal.fire({
      title: 'Delete Product',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545', 
    });

    if (result.isConfirmed){
      try {
        await (dispatch(deleteSaved(saved_id)))
        
        dispatch(getSavedUsersId(getId))
      }
      catch  (err){
        console.log("delete failed: " + err)
      }
    }
  }

  const handleRecipeClick = (recipes_id) => {
  
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/detailRecipe/${recipes_id}`);
    }
  };


  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const currentRecipe = recipe?.data?.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const currentLike = like?.data?.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const currentSaved = saved?.data?.slice(indexOfFirstRecipe, indexOfLastRecipe);



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
           {thisloading? ("loading...") : (usersArray?.map((item,index) => (
            <div className="container-fluid" key={index} >
              <div className="row">
                <div className="col-lg d-flex  flex-column align-items-center">
                  <div className=" position-relative">
                    <img
                      src={item?.image}
                      alt="user foto"
                      className="fotoprofile"
                    />
                    <ModalProfile />
                  </div>
                  <h1 className="nameprofile">{item?.username}</h1>
                </div>
              </div>
            </div>
          )))}
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
                              onClick={() => handleRecipeClick(item.recipes_id)}
                            >
                              {item.name_recipes}
                            </h5>
                            <div className="d-flex flex-row">
                            <ModalUpdate item={item}
                              recipeId={item.recipes_id} style={{zIndex:1}}
                            />
                            <ModalDelete item={item} />
                            </div>
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
                    {loading ? ("loading...") : (currentSaved?.map((item,index) => (
                      <div className="col" key={index}>
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
                            <h5 className="card-title position-absolute bottom-0"
                              style={{
                                color: "#fff",
                                fontFamily: "Airbnb Cereal App",
                                fontSize: 28,
                                textTransform: "capitalize",
                              }}
                              onClick={() => handleRecipeClick(item.recipes_id)}>
                              {item.name_recipes}
                            </h5>
                            <button type="button"  onClick={() => handleDeleteSaved(item.saved_id)} className="btn btn-warning" >
                            <i className="bi bi-bookmark" style={{ color: "white" }}></i>
                              </button>
                          </div>
                        </div>
                      </div>
                    )))}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      {Array.from({
                        length: Math.ceil(saved?.data?.length / recipePerPage),
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
              <Tab eventKey="Liked Recipe" title="Liked Recipe">
                <div className="container">
                  <div className="row row-cols-1 row-cols-md-3 g-4 ">
                    {loading ? ("loading...") : (currentLike?.map((item,index) => (
                      <div className="col" key={index}>
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
                            <h5 className="card-title position-absolute bottom-0"
                              style={{
                                color: "#fff",
                                fontFamily: "Airbnb Cereal App",
                                fontSize: 28,
                                textTransform: "capitalize",
                              }} onClick={() => handleRecipeClick(item.recipes_id)}>
                              {item.name_recipes}
                            </h5>
                            <button type="button"  onClick={() => handleDeleteLike(item.liked_id)} className="btn btn-warning" >
                            <i className="bi bi-hand-thumbs-up" style={{ color: "white" }}></i>
                              </button>
                          </div>
                          
                        </div>
                      </div>
                    )))}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      {Array.from({
                        length: Math.ceil(like?.data?.length / recipePerPage),
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
