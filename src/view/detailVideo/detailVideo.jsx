import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../Component/login/login'
import NavbarHome from '../../Component/NavbarHome/navbarHome'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeId, recipeSelector } from '../../redux/reducer/RecipeSlice'

function DetailVideo() {
const {recipes_id} = useParams()
const dispatch = useDispatch()
const recipe = useSelector(recipeSelector)
const recipes = recipe?.[0]


// useEffect(()=>{
//   axios.get(`${url}/recipe/${recipes_id}`)
//   .then((res)=>{
//     // const {video,} = res.data.data[0]
//     setVideo(res.data.data[0].video)
//     setName_recipes(res.data.data[0].name_recipes)
//     setCreated_at(res.data.data[0].created_at)
//     console.log(res.data.data[0])
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// },[recipes_id])

useEffect(() => {
  dispatch(getRecipeId(recipes_id))
},[])



// console.log(recipes_id)



  return (
    <>
    <div>
    <NavbarHome/>
  </div>
  <section id='detailVideo'>
    <div className="container-fluid">
      <div className="row">
        <div className="vidleft col-xxl-8 offset-lg-1 col-md-12  ">
        <div className="col-xl-12">
                <iframe
                  width="1120px"
                  height="620px"
                  src={recipes?.video}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen=""
                />
              </div>
          <h1 className="h1">
           {recipes?.name_recipes}
          </h1>
          <p>{recipes?.created_at}</p>
        </div>
        <div className="vidright col-xxl-3 col-md-12 d-flex flex-column align-items-center  ">
          <h1 className="h2">Next</h1>
          <div className="right my-4">
            <img src={require("../../asset/image/Rectangle 330.png")} alt="" />
            <h5>
              Beef Steak with Curry Sauce - [Step 5] Saute condiments together
              until turn brown
            </h5>
            <p>HanaLohana - 3 month ago</p>
          </div>
          <div className="fotok mb-4">
            <img src={require("../../asset/image/Rectangle 331.png")} alt="" />
            <h5>
              Beef Steak with Curry Sauce - [Step 5] Saute condiments together
              until turn brown
            </h5>
            <p>HanaLohana - 3 month ago</p>
          </div>
          <div className="fotok">
            <img src={require("../../asset/image/Rectangle 331.png")} alt="" />
            <h5>
              Beef Steak with Curry Sauce - [Step 5] Saute condiments together
              until turn brown
            </h5>
            <p>HanaLohana - 3 month ago</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default DetailVideo