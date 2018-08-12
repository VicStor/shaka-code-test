import { REQUEST_STATUS } from '../utils/api'

const localUser = () => {
	const user = localStorage.getItem('user')
	return (
		user
		? JSON.parse(user)
		: null
	)
}

export const userReducer = (user = localUser(), action) => {
	if(action.type === 'USER_LOGIN') {
		if(action.status === REQUEST_STATUS.DONE) {
			action.data.access_token && localStorage.setItem('token', action.data.access_token)
			action.data.user && localStorage.setItem('user', JSON.stringify(action.data.user))
			return action.data.user
		}
	}
	if(action.type === 'USER_LOGOUT') {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		return null
	}
	return user
}
