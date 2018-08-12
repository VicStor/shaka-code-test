import { REQUEST_STATUS } from '../utils/api'

export const asyncData = {
	isFetching: false,
	data: null,
	error: null
}
export const makeReducer = ({actionType}) => (data = asyncData, action) => {
	if(action.type === actionType) {
		if(action.status === REQUEST_STATUS.FETCHING) {
			return ({
				isFetching: true,
				data: null,
				error: null
			})
		}
		if(action.status === REQUEST_STATUS.DONE) {
			return ({
				isFetching: false,
				data: action.data,
				error: null
			})
		}
		if(action.status === REQUEST_STATUS.ERROR) {
			return ({
				isFetching: false,
				data: null,
				error: action.error
			})
		}
	}
	return data
}