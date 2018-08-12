import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavItem = ({to, children}) => (
	<NavLink
		className="nav-item px-2"
		to={to}
		activeClassName="active"
	>{children}</NavLink>
)

NavItem.propTypes = {
	to: PropTypes.string.isRequired,
}

export default  NavItem