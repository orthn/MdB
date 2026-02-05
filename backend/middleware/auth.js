const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const header = req.headers.authorization;
    console.log(header)
    if (!header) {
        return res.status(401).json({
            message: 'Missing auth header'
        });
    }

    const token = header.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};