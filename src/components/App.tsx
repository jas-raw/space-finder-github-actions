import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import { DataService } from '../services/DataService';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { Profile } from './Profile';
import { SpacesContainer } from './spaces/SpacesContainer';

interface AppState{
	user: User | undefined
}

export class App extends React.Component<{}, AppState>{

	constructor(props: any){
		super(props)
		this.state = {
			user: undefined
		}
		this.setUser = this.setUser.bind(this)
	}

	private authService: AuthService = new AuthService()
	private dataService: DataService = new DataService()

	private setUser(user: User){
		this.setState({user})
	}

	render(){
		return (
			<div className='wrapper'>
				<Router>
					<div>
					<Navbar user={this.state.user} />
					<Routes>
						<Route path="/" element={<Home />} /> 
						<Route path="/login" element={<Login setUser={this.setUser} authService={this.authService} />} />
						<Route path="/profile" element={<Profile authService={this.authService} user={this.state.user} />} />
						<Route path="/spaces" element={<SpacesContainer dataService={this.dataService} />} />
					</Routes>
					</div>
				</Router>
			</div>
		)
	}
}

/*function App() {
return (
	<div>
	App Works!
	</div>
);
}

export default App;
*/
