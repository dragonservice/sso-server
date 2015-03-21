'use strict';

/*
 * Service for sending mail
 * @example
    send: {
        token: process.env.POSTMARK_API_TOKEN
        defaults: {
            From: 'no-reply@dragonprojects.de'
        }
    }
 */

module.exports = function (config, libraries, services) {
    var postmark = libraries.postmark(config.token);

    var send = function (options, callback) {
        options.From = options.From || config.defaults.From;
        postmark.send(options, callback);
    };

    services.send = send;
};
