import React, {useState,useContext,useEffect} from 'react';
import ProfileService from '../Services/ProfileService';
import ProfileItem from "./ProfileItem"
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';

const Profile = props =>{
    const [profile,setName] = useState({name : ""});
    const [profileArr,setProfile] = useState([]);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    useEffect(()=>{
        ProfileService.getProfile().then(data =>{
            setProfile(data.profileArr);
        });
    },[]);

    const onSubmit = e =>{
        e.preventDefault();
        ProfileService.postProfile(profile).then(data =>{
            const { message } = data;
            resetForm();
            if(!message.msgError){
                ProfileService.getProfile().then(getData =>{
                    setProfile(getData.profileArr);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                authContext.setUser({username : "", role : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
    }

    const onChange = e =>{
        setName({name : e.target.value});
    }

    const resetForm = ()=>{
        setName({name : ""});
    }

    return(
        <div>
            <br/>
            <form onSubmit={onSubmit}>
                <label htmlFor="todo">Update Profile</label>
                <input type="text" 
                       name="favArtist" 
                       value={profile.favArtist} 
                       onChange={onChange}
                       className="form-control"
                       placeholder="Favorite Artist here"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Submit</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    );

}

export default Profile;