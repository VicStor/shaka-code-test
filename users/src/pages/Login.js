import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Redirect } from 'react-router'

import {login} from '../redux/actions'
import withUser from '../utils/hocs/is-logged-in'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}
	login = e => {
		e.preventDefault()

		this.props.login({
			email: this.state.email,
			password: this.state.password
		})
	}
	onChange = propName => e => {
		this.setState({
			[propName]: e.target.value
		})
	}
	render() {
		const {email, password} = this.state
		const {isLoggedIn} = this.props
		const submitted = true
		if(isLoggedIn) return <Redirect to="/profile"/>
		return(
			<div className="col-md-6">
				<h2>Login</h2>
				<form name="form">
						<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
								<label htmlFor="email">Email</label>
								<input type="text" className="form-control" name="email" value={email} onChange={this.onChange('email')} />
								{submitted && !email &&
										<div className="help-block">Email is required</div>
								}
						</div>
						<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
								<label htmlFor="password">Password</label>
								<input type="password" className="form-control" name="password" value={password} onChange={this.onChange('password')} />
								{submitted && !password &&
										<div className="help-block">Password is required</div>
								}
						</div>
						<div className="form-group">
								<button onClick={this.login} className="btn btn-primary">Login</button>
						</div>
				</form>
		</div>
		)
	}
}

const dispatchToProps = dispatch => bindActionCreators({
	login
}, dispatch)

export default compose(
	connect(null, dispatchToProps),
	withUser
)(Login)
