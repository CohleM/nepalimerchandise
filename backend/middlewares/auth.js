const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) res.send(401).json({ msg: "no token" });
	try {
		const decodedValue = jwt.verify(token, "SEcretKey");

		//req.user looks like this

		// {
		//     "id": "5f1c57068882ef2684e5083f",
		//     "iat": 1595693638
		// }

		req.user = decodedValue;
		next();
	} catch (e) {
		res.status(400).json({ msg: "token not valid" });
	}
}

module.exports = auth;
