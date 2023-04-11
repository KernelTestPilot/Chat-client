import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/ducks/api/channel",
  headers: {
    "Content-type": "application/json"
  }
  
});