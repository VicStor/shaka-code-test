import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {getUsers, deleteUser} from '../redux/actions'
import UserItem from '../components/UserItem'
import Pagination from '../components/Pagination'

class Users extends Component {
	state = {
		adminsOnly: false,
		page: 1
	}
	componentDidMount() {
		this.getUsers()
	}
	getUsers() {
		const {page, adminsOnly} = this.state
		this.props.getUsers({page, adminsOnly})
	}
	deleteUser = id => _ => {
		this.props.deleteUser(id)
		this.getUsers()
	}
	switchAdminsOnly = _ => {
		this.setState({ adminsOnly: !this.state.adminsOnly }, () => this.getUsers())
	}
	setPage = page => {
		this.setState({page}, () => this.getUsers())
	}
	render() {
		const {users} = this.props
		const {adminsOnly} = this.state
		return (
			<React.Fragment>
				<div className="d-flex flex-row align-items-center">
					<div className="flex-grow-1">
						<h3>
							{adminsOnly
								? 'Administrators'
								: 'All users'
							}
						</h3>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" checked={adminsOnly} onChange={this.switchAdminsOnly} />
						<label className="form-check-label" htmlFor="adminCheck">Show Admins only</label>
					</div>
				</div>
				<ul className="flex-grow-1">
					{users.data && users.data.map(user => <UserItem key={user.id} {...user} deleteUser={this.deleteUser(user.id)}/>)}
				</ul>
				<Pagination
					disabled={users.isFetching}
					onChange={this.setPage}
				/>
			</React.Fragment>
		)
	}
}

const dispatchToProps = dispatch => bindActionCreators({
	getUsers,
	deleteUser,
}, dispatch)
const stateToProps = ({ users }) => ({ users })

Users.propTypes = {
	users: PropTypes.object,
	getUsers: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(Users)

