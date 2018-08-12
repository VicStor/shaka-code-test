import React from 'react'
import PropTypes from 'prop-types'
import withUser from '../utils/hocs/is-logged-in'
import NavItem from './NavItem'

const AppHeader = ({isLoggedIn, isAdmin}) => (
	<header className="app-header navbar navbar-light bg-light d-flex flex-row align-items-center justify-content-end px-2">
			<div>
				<NavItem to="/">Home</NavItem>
				{isLoggedIn ? <NavItem to="/profile">Profile</NavItem> : null}
				{isAdmin ? <NavItem to="/users">Users</NavItem> : null}
				{isLoggedIn ? <NavItem to="/logout">Logout</NavItem> : <NavItem to="/login">Login</NavItem>}
			</div>
	</header>
)
AppHeader.propTypes = {
	isLoggedIn: PropTypes.bool,
	isAdmin: PropTypes.bool
}
export default withUser(AppHeader)