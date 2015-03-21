'use strict';

/**
 * Services for validate input from the client
 * @example
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
    }
 */

module.exports = function (config, libraries, services) {
    var _ = libraries.underscore,
        validator = libraries.validator;

    var middlewares = {};
    var validates = config(validator);
    _.each(validates, function (validate, name) {
        middlewares[name] = function (name) {
            return function (req, res, next) {
                try {
                    req.body[name] = validate(req.body[name]);
                    next();
                } catch (err) {
                    res.json(err.message);
                }
            };
        };
    });

    services.validate = middlewares;
};
