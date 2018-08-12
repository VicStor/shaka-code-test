const jwt = require('jsonwebtoken')
const { findUser } = require('./lib-db.js')

const SECRET_KEY = process.env.SECRET_KEY
const expiresIn = '1h'

function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token, cb){
  return jwt.verify(token, SECRET_KEY, cb)
}

function isAuthenticated({email, password}){
  return findUser({email, password}) !== undefined
}

module.exports = {
	createToken, verifyToken, isAuthenticated
}