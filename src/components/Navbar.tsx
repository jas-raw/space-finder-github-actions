import React from "react";
import { Link } from "react-router-dom";
import { User } from "../model/Model";

export class Navbar extends React.Component<{user: User | undefined}>{

    render(){

        let loginLogOut: any
        if(this.props.user){
            loginLogOut = <Link data-testid="logout-link" to="/logout" style={{float: "right"}}>{this.props.user.userName}</Link>
        }else{
            loginLogOut = <Link data-testid="login-link" to="/login" style={{float: "right"}}>Login</Link>
        }


        return(
            <div className="navbar">
                <Link data-testid="home-link" to="/">Home</Link>
                <Link data-testid="profile-link" to="/profile">Profile</Link>
                <Link data-testid="spaces-link" to="/spaces">Spaces</Link>
                {loginLogOut}
            </div>
        )
    }
}