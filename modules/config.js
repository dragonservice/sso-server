"use strict";

/**
 * Serves the config for the application
 * @example
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
 */

module.exports = function (config, libraries, services) {
    var app = services.app;

    app.get(config.route, function (req, res) {
        res.json(config.config);
    });
};
