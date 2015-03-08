"use strict";

/*
 * Service for password hashing and verifying
 * @example
    password: {}
 */

module.exports = function (config, libraries, services) {
    var passwordHash = libraries.passwordHash;

    services.password = {
        hash: function (password, callback) {
            callback(passwordHash.generate(password));
        },
        verify: function (password, hash, callback) {
            if (passwordHash.isHashed(hash)) {
                callback(passwordHash.verify(password, hash));
            } else {
                callback(password == hash);
            }
        }
    };
};
