import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import './Navbar.css';

const Register = props=>{
    const [user,setUser] = useState({username: "", email: "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", email: "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }



    return(
        <div className="login">
            <form onSubmit={onSubmit}>
                <h3>Register for Musify</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username *"/>
                <label htmlFor="email" className="sr-only">Email: </label>
                <input type="email" 
                       name="email" 
                       value={user.email}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Email address *"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password *"/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control *" 
                       placeholder="Enter role (admin/user)"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Register</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;