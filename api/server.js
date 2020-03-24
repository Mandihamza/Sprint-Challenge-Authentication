const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

const authenticate = require('../auth/authenticate-middleware.js');
const welcomeRouter = require('../welcome/welcome-router')
const authRouter = require('../auth/auth-router.js');
const usersRouter = require("../users/users-router")
const jokesRouter = require('../jokes/jokes-router.js');
const dbConfig = require("../database/dbConfig")

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser())

server.use(session({
	name: "token",
	resave: false,
	saveUninitialized: false, 
	secret: process.env.COOKIE_SECRET || "secret", // 
	cookie: {
		httpOnly: true, 
	},
	store: new KnexSessionStore({
		knex: dbConfig, 
		createtable: true, 
	}),
}))

server.use('/api/welcome', welcomeRouter)
server.use('/api/auth', authRouter);
server.use("/api/users", usersRouter)
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
