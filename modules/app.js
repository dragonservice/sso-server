"use strict";

/**
 * Initialize the application
 * @example
    app: {}
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        bodyParser = libraries.bodyParser;

    app.use(bodyParser.json());
};
