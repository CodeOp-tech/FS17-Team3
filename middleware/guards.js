const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");

// Ensure user is logged in

function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req);

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).send({error: 'Unauthorised'});
    }
}

// Ensure user is logged in and accessing their own page
// ie userId in token === userId in params

function ensureSameUser(req, res, next) {
    let token = _getToken(req);

    try {
        let payload = jwt.verify(token, SECRET_KEY);
        if (payload.userId === Number(req.params.userId)) {
            next();
        } else {
            res.status(401).send({error: 'Unauthorised'}); 
        }
    } catch (err) {
        res.status(500).send({error: 'Unauthorised'});
    }
}

function ensureSameSeller(req, res, next) {
    let token = _getToken(req);

    try {
        let payload = jwt.verify(token, SECRET_KEY);
        if (payload.sellerId === Number(req.params.sellerId)) {
            next();
        } else {
            res.status(401).send({error: 'Unauthorised'});
        }
    } catch (err) {
        res.status(500).send({error: 'Unauthorised'});
    }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

 function _getToken(req) {
    // Return '' if header not found
    if ( !('authorisation' in req.headers) ) {
        return '';
    }

    // Split header into 'Bearer' and token
    let authHeader = req.headers['authorisation'];
    let [str, token] = authHeader.split(' ');

    return (str === 'Bearer') ? token : '';
}

module.exports = {
    ensureUserLoggedIn,
    ensureSameUser,
    ensureSameSeller 
}