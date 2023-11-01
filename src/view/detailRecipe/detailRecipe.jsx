import React, { useEffect, useState } from "react";
import Footer from "../../Component/footer/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../Component/login/login";
import NavbarHome from "../../Component/NavbarHome/navbarHome";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeId, recipeSelector } from "../../redux/reducer/RecipeSlice";
import styles from "./detailRecipe.module.css"
import { createLiked } from "../../redux/reducer/liked/createdLikedSlice";
import { ToastContainer } from "react-toastify";
import { createSaved } from "../../redux/reducer/Saved/createSavedSlice";
import { getCommentRecipeId, getCommentRecipeIdSelector } from "../../redux/reducer/Comment/getCommentRecipeIdSlice";
import { createComment } from "../../redux/reducer/Comment/createCommentSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { deleteComment } from "../../redux/reducer/Comment/deleteCommentSlice";



function DetailRecipe() {
  const { recipes_id } = useParams();
  const users_id = localStorage.getItem("userId")
  // console.log(users_id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recipe = useSelector(recipeSelector)
  const comment = useSelector (getCommentRecipeIdSelector)
  const [loading,setLoading] = useState(true)
  const [commen,setCommen] = useState("")
  // console.log(comment);

  useEffect(() => {
    dispatch(getRecipeId(recipes_id))
    setLoading(false)
  },[dispatch,recipes_id])

  useEffect(()=> {
    try {
      dispatch(getCommentRecipeId(recipes_id))
    }
    catch (err) {
      console.log(err)
    }
  },[dispatch,recipes_id])

  const handleRecipeClick = (recipes_id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/detailVideo/${recipes_id}`);
    }
  };

  const handleComment = async () => {
    try {
      await dispatch(createComment({commen,recipes_id,users_id}));

      await dispatch((getCommentRecipeId(recipes_id)))
      setCommen("")
    }
    catch (error) {
      console.log(error);
    }
  }

  const deletedComment = async (comment_id) => {
    try {
      await dispatch(deleteComment(comment_id));

      await dispatch((getCommentRecipeId(recipes_id)))
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleLike = async () => {
    try {
      await dispatch(createLiked({recipes_id,users_id}));
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSaved = async () => {
    try {
      await dispatch(createSaved({recipes_id,users_id}));
    }
    catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
  <ToastContainer/>
      <div>
        <NavbarHome />
      </div>
      <section id="detailRecipe">
        <div className="container-fluid">
        {loading? ("loading....") : (recipe?.data?.map((item,index)=>(
          <div className="row" key={index}>
            
          <div  className="col-xl-12 text-center"> 
            <h1 >{item?.name_recipes}</h1>
          </div>
          <div className="image row">
            <div className="col-xl-12 d-grid justify-content-center position-relative ">
              <div className="position-relative">
              <img src={item?.image} alt=""/>
              <button type="button"  
              onClick={handleSaved}
              className={`${styles.button1} position-absolute`}>
                            <i className={`${styles.icon} bi bi-bookmark`}></i>
                              </button>
                              <button type="button"  
              onClick={handleLike}
              className={`${styles.button2} position-absolute`} >
                           <i className={`${styles.icon1} bi bi-hand-thumbs-up`}></i>
                              </button>
            </div>
            </div>
          </div>
          </div>
          )))}
        </div>
        <div className="container-fluid mb-5">
  {loading ? "Loading...." : (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <h2>Ingredients</h2>
          {recipe
            ? recipe?.data?.map((item, index) => (
                <div className="desk" key={index}>
                  {item.ingredients.split('-').map((ingredient, subIndex) => (
                    <span key={subIndex}>
                     <p className="desk">{ingredient}</p>
                    </span>
                  ))}
                </div>
              ))
            : 'No ingredients available'}
        </div>
      </div>
    </div>
  )}
</div>

        <div className="container-fluid ">
          <div className="container d-flex flex-column">
            <div className="row " style={{ marginBottom: "2.9069rem" }}>
              <div className="col-xl-12">
                <h2>Video Step</h2>
              </div>
              <div className="col-xl-12" onClick={(()=>{handleRecipeClick(recipes_id)})} >
                <div style={{backgroundColor:"#EFC81A", width:"100%",height:"5vh",borderRadius:"15px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <i class="bi bi-play" style={{color:"white",fontSize:34.96}}></i>
                </div>
              </div>
              
            </div>
            <div className="row" style={{ marginBottom: "2.9069rem" }} onClick={(()=>{handleRecipeClick(recipes_id)})}>
              <div className="col-xl-12">
              <div style={{backgroundColor:"#EFC81A", width:"100%",height:"5vh",borderRadius:"15px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <i class="bi bi-play" style={{color:"white",fontSize:34.96}}></i>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginBottom: "2.9069rem" }} onClick={(()=>{handleRecipeClick(recipes_id)})}>
              <div className="col-xl-12">
              <div style={{backgroundColor:"#EFC81A", width:"100%",height:"5vh",borderRadius:"15px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <i class="bi bi-play" style={{color:"white",fontSize:34.96}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid ">
            <div className="container d-flex flex-column">
              <div className="row">
                <div className="col-xl-12">
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      aria-label="With textarea"
                      placeholder="Comment"
                      value={commen}
                      onChange={(e) => setCommen(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="d-grid col-6 mx-auto justify-content-center">
                  <div className="btn btn-primary" type="button" onClick={handleComment}>
                    Send
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 my-4">
                  <h2>Comment</h2>
                </div>
                <div className="col-12">
                  {loading? ("loading...") : (comment?.data?.map((item,i)=> (
                  <div className="ucomment d-flex justify-content-center align-items-center" key={i} style={{marginTop:15,}}>
                    <img
                      src={item.imageprofile}
                      alt=""
                    />
                    <div className="d-flex w-100 h-100 justify-content-between align-items-center">
                    <div className="commentuser mx-4 align-items-center justify-content-center">
                      <p className="user">{item.creator}</p>
                      <p className="cmnt">
                        {item.commen}
                      </p>
                    </div>
                    <Dropdown className={styles.dropwdown}>
                    <Dropdown.Toggle variant="secondary" size="sm" style={{width:"40px",alignItems:"center",backgroundColor:"gray"}}>
                    <i className="bi bi-three-dots-vertical" style={{fontSize:"100%"}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item >Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => deletedComment(item.comment_id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  </div>
                  )))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default DetailRecipe;
