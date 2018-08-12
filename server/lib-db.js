const { omit, isNil, times } = require('ramda')
const { users, roles } = require('./db.json')

const random = (min, max) => {
	let rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

const seedDB = () => {
	const dbUseers = users.map(user => ({
		...user,
		password: 'test',
		roleId: random(1, 2)
	}))
	console.log('USERS:\n', JSON.stringify(dbUseers, null, 2))
	return ({
		users: dbUseers,
		roles
	})
}


const findUser = DB => ({email, password}) => {
	const user = DB.users.find(user => user.email === email && user.password === password)
	return (
		isNil(user)
		? undefined
		: omit(['password'], user)
	)
}

const DB = seedDB()

module.exports = {
	findUser: findUser(DB),
	DB
}