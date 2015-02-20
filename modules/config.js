"use strict";
/*global module:false */

/**
 * Serves the config for the application
 * @example
    config: {
        pkg: __dirname + '/package.json',
    }
 */

module.exports = function (config, libraries, services) {
    var app = services.app;

    var json = {
        pkg: function () {
            var pkg = require(config.pkg);
            return {
                name: pkg.name,
                version: pkg.version,
                homepage: pkg.homepage
            };
        }()
    };

    app.get('/', function (req, res) {
        res.json(json);
    });
};
