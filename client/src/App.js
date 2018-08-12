import React from 'react';
import { Switch, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import Home from './pages/Home'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Logout from './pages/Logout'
import AppHeader from './components/AppHeader'
import authRoute from './utils/hocs/auth-route'

const App = () => (
	<div className="app d-flex flex-column">
		<AppHeader />
		<div className="container flex-grow-1 d-flex flex-column py-4">
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/logout" component={Logout}/>
				<Route exact path="/profile" component={authRoute(Profile, [1, 2])}/>
				<Route path="/users" component={authRoute(Users, [1])}/>
			</Switch>
		</div>
	</div>
)

export default App
