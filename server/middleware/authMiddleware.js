const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Токен отсутствует" });
        }

        const token = authHeader.split(' ')[1]; // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" });
    }
};
