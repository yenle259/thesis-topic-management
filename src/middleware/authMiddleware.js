const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.access_token;

    //check json web token is existed and is verify
    if (token) {
        jwt.verify(token, 'thesis topic manage', (error, decodedToken) => {
            if (error) {
                console.log(error);
                res.redirect('http://localhost:8080/login');
            } else {
                // console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('http://localhost:8080/login');
    }
}

module.exports = { requireAuth }