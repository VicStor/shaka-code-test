import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({name, email, deleteUser}) => {
	return (
		<li className="d-flex flex-row bg-light rounded my-1 align-items-center">
				<div className="flex-grow-1 text-left px-2">
					{`${name} email: ${email}`}
				</div>
				<button
					className="btn btn-danger" 
					onClick={deleteUser}
					children='Delete user'
				/>
		</li>
	)
}

UserItem.propTypes = {
	name: PropTypes.string, 
	email: PropTypes.string, 
	deleteUser: PropTypes.func
}

export default  UserItem
