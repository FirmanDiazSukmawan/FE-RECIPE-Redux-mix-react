import React from "react";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate;

  const handleClick = async (e) => {
    navigate("/");
  };

  return (
    <>
      <button className="btn btn dark" onClick={handleClick}>
        Back
      </button>
    </>
  );
};

export default NotFound;
