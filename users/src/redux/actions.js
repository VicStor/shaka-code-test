import { requestAction } from '../utils/api'

export const REQUEST_USERS = {
	urlName: 'users',
	actionType: 'REQUEST_USERS'
}

export const USER_LOGIN = {
	urlName: 'users',
	actionType: 'USER_LOGIN'
}

export const login = body => requestAction({actionType: 'USER_LOGIN', route: {
	url: '/auth/login',
	method: 'POST',
	body
}})

const RECORDS_PAGE = 3

export const getUsers = ({page = 1, adminsOnly}) => requestAction({actionType: 'REQUEST_USERS', route: {
	url: `/api/users?_page=${page}&_limit=${RECORDS_PAGE}${adminsOnly ? '&roleId_ne=2' : ''}`,
	method: 'GET'
}})

export const deleteUser = (id) => requestAction({actionType: 'DELETE_USER', route: {
	url: `/api/users/${id}`,
	method: 'DELETE'
}})

export const logout = () => ({type: 'USER_LOGOUT'})
