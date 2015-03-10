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
                    var session = {
                        user_id: user._id
                    };
                    db.sessions.insert(session, function () {
                        res.json(session._id);
                    });
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
                    var session = {
                        user_id: user._id
                    };
                    db.sessions.insert(session, function () {
                        res.json(session._id);
                    });
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
                    res.json('unknown email');
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
            db.forgets.findById(req.body.token, function (err, forget) {
                if (!forget) {
                    res.json('wrong token');
                    return;
                }
                db.forgets.removeById(req.body.token, function () {});
                password.hash(req.body.password, function (passwordhash) {
                    db.users.updateById(forget.user_id, { $set: { passwordhash: passwordhash } }, function () {
                        res.json();
                    });
                });
            });
        }
    );

    app.post(
        '/verify',
        [],
        function (req, res) {
            db.sessions.findById(req.body.session_id, function (err, session) {
                if (!session) {
                    res.json('wrong session_id');
                    return;
                }
                res.json({ _id: session.user_id });
            });
        }
    );
};
