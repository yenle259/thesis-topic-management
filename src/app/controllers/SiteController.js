
class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send('Site Controller!!!');
    }

    // [GET] /set-cookies
    setCookies(req, res, next) {
        // res.setHeader('Set-Cookie','newUser=true')
        res.cookie('isStudent', true);
        res.send('got cookiess');
    }

    // [GET] /read-cookies
    readCookies(req, res, next) {
        const cookies = req.cookies;
        console.log(cookies);
        res.json(cookies);
    }
}

module.exports = new SiteController();
