"use strict";

/**
 * Handle the user
 * @example
    user: {
        reset: ''
    }
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        db = services.db,
        password = services.password,
        send = services.send,
        validate = services.validate;

    app.post(
        '/register',
        [
            validate.email('email'),
            validate.password('password')
        ],
        function (req, res) {
            password.hash(req.body.password, function (passwordhash) {
                var user = {
                    email: req.body.email,
                    passwordhash: passwordhash
                };
                db.users.insert(user, function (err) {
                    if (err) {
                        res.json('email already in use');
                    }
                    res.json();
                });
            });
        }
    );

    app.post(
        '/login',
        [],
        function (req, res) {
            var query = { email: req.body.email };
            db.users.findOne(query, function (err, user) {
                if (!user) {
                    res.json('unknown email');
                    return;
                }
                password.verify(req.body.password, user.passwordhash, function (verify) {
                    if (!verify) {
                        res.json('wrong password');
                        return;
                    }
                    res.json();
                });
            });
        }
    );

    app.post(
        '/forget',
        function (req, res) {
            var query = { email: req.body.email };
            db.users.findOne(query, function (err, user) {
                if (!user) {
                    res('unknown email');
                    return;
                }
                var forget = {
                    user_id: user._id
                };
                db.forgets.insert(forget, function () {
                    send({
                        To: user.email,
                        Subject: 'Password forget',
                        TextBody: config.reset.replace('%token%', forget._id)
                    });
                });
                res.json();
            });
        }
    );

    app.post(
        '/reset',
        validate.password('password'),
        function (req, res) {

            // load and remove token
            req.body.token;
            // set password
            req.body.password;

            res.json();
        }
    );

    app.post(
        '/verify',
        [],
        function (req, res) {
            res.json();
        }
    );
};
