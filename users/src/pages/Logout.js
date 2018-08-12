import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {logout} from '../redux/actions'

const Logout = ({logout}) => {
	logout()
	return (
		<Redirect to="/" />
	)
}

Logout.propTypes = {
	logout: PropTypes.func.isRequired
}
const dispatchToProps = dispatch => bindActionCreators({
	logout
}, dispatch)

export default connect(null, dispatchToProps)(Logout)
