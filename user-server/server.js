require('dotenv').config()
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const {createToken, verifyToken, isAuthenticated} = require('./lib-auth')
const {findUser, DB} = require('./lib-db')

const PORT = process.env.PORT || 5555

const server = jsonServer.create()
const router = jsonServer.router(DB)

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.post('/auth/login', (req, res) => {
	const {email, password} = req.body
	if (isAuthenticated({email, password}) === false) {
		const status = 401
		const message = 'Incorrect credentials'
		res.status(status).json({status, message})
		return
	}
	const user = findUser({email, password})
	const access_token = createToken(user)
	res.status(200).json({
		access_token,
		user
	})
})

server.use('/api', (req, res, next) => {
	if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
		const status = 401
		const message = 'Bad authorization header'
		res.status(status).json({status, message})
		return
	}
	verifyToken(req.headers.authorization.split(' ')[1], (err, user) => {
		if(user) {
			req.user = user
			next()
			return
		}
		
		const status = 401
		const message = 'Error: invalid token'
		res.status(status).json({status, message})
	})
})

server.use('/api', router)

server.listen(PORT, () => {
	console.log(`🚀 Server is running on port: ${PORT}`)
})