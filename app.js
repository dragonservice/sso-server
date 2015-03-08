"use strict";

// Load the libraries and modules

var config = {
    libraries: {
        bodyParser: require('body-parser')
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
                collections: {}
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
            }
        }
    }
};
require('dragonnodejs')(config);
