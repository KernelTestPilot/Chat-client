import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
    const initialUserState = {
      username: null,
      password: null,
    };

    const [user, setUser] = useState(initialUserState);
    const [login, setLogin] = useState([]);
    const [handleSubmit, setSubmitted] = useState(false);
    
    const [session, setSession] = useState("testsetsts");
    
 
    useEffect(() => {
      if (handleSubmit) {
        navigate("/channels");
      } else {
        navigate("/login");
        
      }
    }, [navigate, handleSubmit]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };
      
    const saveUser = (navigation) => {
        var data = {
          username: user.username,
          password: user.password
        };
        UserService.login(data)
          .then(response => {

            setSubmitted(true);
            if(response.status === 200){
              console.log(response.data)
              setToken(response.data)
              setSubmitted(true);  
              setLogin(true)            	
            }
          })
          .catch(e => {
            setSubmitted(false);
           setLogin(e.response.data)
          });
      };


return(

<div>
      {!handleSubmit
        ? <div>{login}</div>
        : <div> </div>
      }
   
    <div>
          <div className="form-group">
            <label htmlFor="title">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              onChange={handleInputChange}
              value={user.password}
              name="password"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Login
          </button>
        

          </div>
          
        </div>



)

}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};


export default Login;