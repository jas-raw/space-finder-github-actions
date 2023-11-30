import React, { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from "../utils/history";

interface LoginProps{
    authService: AuthService
    setUser: (user: User) => void
}
interface LoginState{
    userName: string
    password: string
    loginAttenpted: boolean
    loginSuccessfull: boolean
}

interface CustomEvent{
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState>{

    state: LoginState = {
        userName: "",
        password: "",
        loginAttenpted: false,
        loginSuccessfull: false
    }

    private setUsername(e: CustomEvent){
        this.setState({userName: e.target.value})
    }

    private setPassword(e: CustomEvent){
        this.setState({password: e.target.value})
    }

    private async handleSubmit(e: SyntheticEvent){
        e.preventDefault()
        this.setState({loginAttenpted: true})
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if(result){
            history.push("/profile")
            this.setState({loginSuccessfull: true})
            this.props.setUser(result)
        }else{
            console.log("Wrong Login")
            this.setState({loginSuccessfull: false})
        }
    }

    render(){

        let loginMessage: any
        if(this.state.loginAttenpted){
            if(this.state.loginSuccessfull){
                loginMessage = <label>Login success</label>
            }else{
                loginMessage = <label>Login failed</label>
            }
        }

        return (
            <div>
                <h2>Please Login</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" onChange={e => this.setUsername(e)} value={this.state.userName} />
                    <input type="password" onChange={e => this.setPassword(e)} value={this.state.password} />
                    <input type="submit" value={"Login"} />
                </form>
                {loginMessage}
            </div>
        )
    }

}