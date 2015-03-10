"use strict";

// Load the libraries and modules

var config = {
    libraries: {
        bodyParser: require('body-parser'),
        passwordHash: require('password-hash'),
        postmark: require('postmark'),
        underscore: require('underscore'),
        validator: require('validator')
    },
    directory: __dirname + '/modules/',
    modules: {
        npm: [
            [require('dragonnodejs-express'), {
                app: {
                    port: process.env.PORT
                },
                auth: {
                    disabled: process.env.AUTH_DISABLED,
                    users: process.env.AUTH_USERS,
                    user: process.env.AUTH_USER,
                    password: process.env.AUTH_PASSWORD,
                    realm: process.env.AUTH_REALM
                },
                cors: {},
                header: {
                    'X-Powered-By': null
                }
            }],
            [require('dragonnodejs-mongodb'), {
                db: {
                    uri: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/sso-server?auto_reconnect=true',
                    options: { safe: true }
                },
                collections: {
                    forgets: [
                        []
                    ],
                    sessions: [
                        []
                    ],
                    users: [
                        [{ email: 1 }, { sparse: true, unique: true }]
                    ]
                }
            }]
        ],
        directory: {
            app: {},
            config: {
                route: '/',
                config: function () {
                    var pkg = require(__dirname + '/package.json');
                    return {
                        name: pkg.name,
                        version: pkg.version,
                        homepage: pkg.homepage
                    };
                }()
            },
            password: {},
            send: {
                token: process.env.POSTMARK_API_TOKEN,
                defaults: {
                    From: 'no-reply@dragonprojects.de'
                }
            },
            validate: function (validator) {
                return {
                    email: function (input) {
                        input = validator.trim(input);
                        if (!validator.isEmail(input)) {
                            throw new Error('invalid email');
                        }
                        return input;
                    },
                    password: function (input) {
                        input = validator.trim(input);
                        return input;
                    }
                };
            },
            user: {
                reset: process.env.RESET
            }
        }
    }
};
require('dragonnodejs')(config);
