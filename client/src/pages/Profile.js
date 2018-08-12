import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Profile = ({user}) => {
	return (
		<div className="">
				<h1>Hi {user.name}!</h1>
		</div>
	)
}

Profile.propTypes = {
	user: PropTypes.object
}

const stateToProps = ({user}) => ({ user })

export default connect(stateToProps)(Profile)
