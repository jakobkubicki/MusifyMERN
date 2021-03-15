import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';
import './Login.css';


const Login = props=>{
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/profile');
            }
            else
                setMessage(message);
        });
    }



    return(
        <div className="loginDiv">
            <div className="login">
                <form onSubmit={onSubmit}>
                    <h3>Sign in to Musify</h3>
                    <label htmlFor="username" className="sr-only">Username: </label>
                    <input type="text" 
                        name="username" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Username *"/>
                    <label htmlFor="password" className="sr-only">Password: </label>
                    <input type="password" 
                        name="password" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Password *"/>
                    <button className="btn btn-lg btn-primary btn-block" 
                            type="submit">Log in </button>
                </form>
                {message ? <Message message={message}/> : null}

                <h4>Forgot Password?</h4>
                <h4>Register</h4>
            </div>
        </div>
    )
}

export default Login;