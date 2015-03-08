"use strict";

/*
 * Service for password hashing and verifying
 * @example
    password: {}
 */

module.exports = function (config, libraries, services) {
    services.password = {
        hash: function (password, callback) { callback(password); },
        verify: function (password, hash, callback) { callback(password == hash); }
    };
};
