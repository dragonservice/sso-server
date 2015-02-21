"use strict";
/*global __dirname:false */

// Load the libraries and modules

var config = {
    directory: __dirname + '/modules/',
    modules: {
        npm: [
            [require('dragonnodejs-express'), {
                app: {
                    port: process.env.PORT
                },
                auth: {
                    disabled: process.env.AUTH_DISABLED,
                    realm: process.env.AUTH_REALM,
                    user: process.env.AUTH_USER,
                    password: process.env.AUTH_PASSWORD
                },
                cors: {},
                header: {
                    'X-Powered-By': null
                }
            }]
        ],
        directory: {
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
