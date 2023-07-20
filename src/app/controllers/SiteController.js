
class SiteController {
    
    // [GET] /
    index(req, res, next) {
        res.send('Site Controller!!!');
    }
}

module.exports = new SiteController();
