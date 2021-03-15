import React from 'react';
import './Home.css';

export default class fetchUsers extends React.Component{

    state = {
        loading: true,
        person: []
    }

        async componentDidMount() {
            const url = "http://localhost:5000/getData";
            const response = await fetch(url);
            const data = await response.json();
            this.setState({ person: data, loading: false});
            console.log(data);
            console.log(data[0].username);
        };

    render(){
        return  (
            <div>
                {this.state.loading || !this.state.person ? (
                    <div>Loading Musify...</div>
                ) : (
                    <div className="home">
                        <h1>Welcome to Musify!</h1>
                        <h3>Your one stop shop for all things music!</h3>
                        {this.state.person.map((users, index) => {
                            return <p>{users.username}</p>
                        })}
                    </div>
                )}
            </div>
        )
    }
}