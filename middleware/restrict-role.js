function restrictRole(role) {
	return (req, res, next) => {
		const { token } = req.cookies

		if (token && token.userRole === role) {
			next()
		} else {
			return res.status(403).json({
				message: "You are not allowed here",
			})
		}
	}
}

module.exports = restrictRole