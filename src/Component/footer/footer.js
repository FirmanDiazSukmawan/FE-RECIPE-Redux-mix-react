import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id='footer' className='bawah' >
    <div className="container-fluid text-center d-flex justify-items-center align-items-center flex-column mt-5 p-5 ">
      <div className="row ">
        <div className="foter col-12 ">
          <h1 className="fot my-5">Eat,Cook,Repeat</h1>
          <p className="share my-5">
            Share your best recipe by uploading here !
          </p>
          <span className="foot p-5 ">
            <Link to="/" className="footp my-3 mx-3">
              Product
            </Link>
            <Link to="#" className="footp my-3 mx-3">
              Company
            </Link>
            <Link to="#" className="footp my-3 mx-3">
              Learn More
            </Link>
            <Link to="#" className="footp my-3 mx-3">
              Get in Touch
            </Link>
          </span>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer