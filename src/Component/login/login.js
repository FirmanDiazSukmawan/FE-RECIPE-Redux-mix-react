import axios from "axios";


const url =  process.env.REACT_APP_BACKEND_URL




const login = (data,callback) => {
    axios.post(`${url}/users/login`, { ...data })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        callback(err.response);
      });
  }

  export {url,login}