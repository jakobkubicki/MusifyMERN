// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getProfile : ()=>{
        return fetch('https://musify-mern.herokuapp.com/user/profile')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    postProfile : todo=>{
        return fetch('https://musify-mern.herokuapp.com/user/profile',{
            method : "post",
            body : JSON.stringify(todo),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    }
}