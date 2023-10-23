const jwt = require('jsonwebtoken');
const User = require('../app/models/Lecturer');

const requireAuth = (req, res, next) => {
    const token = req.cookies.access_token;

    //check json web token is existed and is verify
    if (token) {
        jwt.verify(token, 'thesis topic manage', (error, decodedToken) => {
            if (error) {
                console.log(error);
                res.redirect('http://localhost:8080/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('http://localhost:8080/login');
    }
}

//check current user
const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.access_token;

    //check json web token is existed and is verify
    if (token) {
        jwt.verify(token, 'thesis topic manage', async (error, decodedToken) => {
            if (error) {
                console.log(error);
                res.locals.user = null;
                next();
            } else {
                //valid current user - return a ID of user
                // decodedToken like { id: '6513ecafd5d7abd1da6e942b', iat: 1695808883, exp: 1696068083 }
                let currentUser = await User.findById(decodedToken.id)
                res.locals.user = currentUser;
                console.log(currentUser);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkCurrentUser }