import React from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileState{
    userAttribute: UserAttribute[]
}

interface ProfileProps{
    user: User | undefined
    authService: AuthService
}

export class Profile extends React.Component <ProfileProps, ProfileState>{

    state: ProfileState = {
        userAttribute: []
    }

    async componentDidMount(){
        if(this.props.user){
            const userAtrs = await this.props.authService.getUserAttributes(this.props.user)
            this.setState({
                userAttribute: userAtrs
            })
        }
    }

    private renderUserAttribute(){
        const rows = []
        for (const userAttribute of this.state.userAttribute) {
            rows.push(<tr key={userAttribute.Name}>
                <td>{userAttribute.Name}</td>
                <td>{userAttribute.Value}</td>
            </tr>)
            
        }
        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    }

    render(){

        let profileSpace
        if(this.props.user){
            profileSpace = <div>
                <h3>Hello {this.props.user.userName}</h3>
                Here are you attributes
                {this.renderUserAttribute()}
            </div>
        }else{
            profileSpace = <div>
                Please <Link to="/Login">Login</Link>
            </div>
        }

        return(
            <div>
                Welcome to the profile page
                {profileSpace}
            </div>
        )
    }
}