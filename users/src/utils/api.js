export const REQUEST_STATUS = {
	FETCHING: 'FETCHING',
	DONE: 'DONE',
	ERROR: 'ERROR'
}

export const fetchApi = ({url, body, ...options}) => {
	const reqOptions = {
		...options,
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : undefined
	}
	return (
		fetch(url, reqOptions)
		.then(res => res.json())
		.catch(err => {
			throw Error(err.message)
		})
	)
}

export const makeUrl = (endpoint, params = {}) => {
	const {url, urlParams} = endpoint

	return urlParams.reduce((apiUrl, paramName) => {
		const paramRegExp = new RegExp(`:${paramName}`, 'i');
		return apiUrl.replace(paramRegExp, params[paramName])
	}, url)
}

export const requestAction = action => dispatch => {
	dispatch({
		type: action.actionType,
		status: REQUEST_STATUS.FETCHING,
		error: null,
		data: null
	})
	fetchApi(action.route)
	.then(data => {
		dispatch({
			type: action.actionType,
			status: REQUEST_STATUS.DONE,
			error: null,
			data
		})
	})
	.catch(error => {
		dispatch({
			type: action.actionType,
			status: REQUEST_STATUS.ERROR,
			error,
			data: null
		})
	})
}
export const makeApi = ({urlName, actionType}) => {
	const restStruct = [{
		apiMethod: `getAll${urlName}`,
		method: 'GET',
		url: `/${urlName}`,
		urlParams: []
	}, {
		apiMethod: `get${urlName}`,
		method: 'GET',
		url: `/${urlName}/:id`,
		urlParams: ['id']
	}, {
		apiMethod: `post${urlName}`,
		method: 'POST',
		url: `/${urlName}`,
		urlParams: ['id']
	}, {
		apiMethod: `put${urlName}`,
		method: 'PUT',
		url: `/${urlName}/:id`,
		urlParams: ['id']
	}, {
		apiMethod: `patch${urlName}`,
		method: 'PATCH',
		url: `/${urlName}/:id`,
		urlParams: ['id']
	}, {
		apiMethod: `delete${urlName}`,
		method: 'DELETE',
		url: `/${urlName}/:id`,
		urlParams: ['id']
	}]

	return restStruct.reduce((api, endpoint) => ({
		...api,
		[endpoint.apiMethod]: ({params, body} = {}) => (
			requestAction({actionType, route: {
				url: `/api${makeUrl(endpoint, params)}`,
				method: endpoint.method,
				body
			}})
		)
	}), {})
}