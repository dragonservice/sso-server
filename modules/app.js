"use strict";
/*global module:false */

/**
 * Express initialization, app service and CORS initialization
 * @example
    app: {
        port: process.env.PORT
    }
 */

module.exports = function (config, libraries, services) {
    var cors = libraries.cors,
        express = libraries.express;

    var app = express();
    app.listen(config.port);
    app.use(cors());

    services.app = app;
};
