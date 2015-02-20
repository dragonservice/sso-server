"use strict";
/*global __dirname:false */

// Load the libraries and modules

var config = {
    libraries: {
        cors: require('cors'),
        express: require('express')
    },
    directory: __dirname + '/modules/',
    modules: {
        directory: {
            app: {
                port: process.env.PORT
            },
            config: {
                pkg: __dirname + '/package.json'
            }
        }
    }
};
require('dragonnodejs')(config);
