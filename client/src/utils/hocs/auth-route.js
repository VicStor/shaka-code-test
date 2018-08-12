import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const authRoute = (Comp, roles) => {
	class AuthRoute extends Component {
		hasAccess() {
			const {user} = this.props
			return user && roles.includes(user.roleId)
		}
		render() {
			return (
				this.hasAccess()
				? <Comp />
				: <Redirect to="/login"/>
			)
		}
	}
	AuthRoute.propTypes = {
		user: PropTypes.object
	}
	const stateToProps = ({user}) => ({user})
	return connect(stateToProps)(AuthRoute)
}

export default authRoute