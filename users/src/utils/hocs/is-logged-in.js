import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const withUser = Comp => {
	class WithUser extends Component {
		render() {
			return (
				<Comp {...this.props}/>
			)
		}
	}
	WithUser.propTypes = {
		isLoggedIn: PropTypes.bool,
		isAdmin: PropTypes.bool
	}
	const stateToProps = ({user}) => ({
		isLoggedIn: !!user,
		isAdmin: !!user && user.roleId === 1
	})
	return connect(stateToProps)(WithUser)
}

export default withUser