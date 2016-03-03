"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.run = exports.connect = undefined;

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _rethinkdb = require("rethinkdb");

var _rethinkdb2 = _interopRequireDefault(_rethinkdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* leny/repanse
 *
 * /src/main.js - A simple wrapper around RethinkDB
 *
 * coded by leny@flatLand!
 * started at 03/03/2016
 */

var _fConnect = undefined,
    _fRun = undefined,
    _oConnection = undefined;

exports.connect = _fConnect = function _fConnect(oConnectOptions) {
    return new _bluebird2.default(function (fResolve, fReject) {
        _rethinkdb2.default.connect(oConnectOptions).catch(fReject).then(function (oNewConnection) {
            _oConnection = oNewConnection;
            fResolve();
        });
    });
};

exports.run = _fRun = function _fRun(mOperations) {
    var bRunInSequence = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var _run = function _run(oOperation) {
        return oOperation.run(_oConnection);
    };

    if (Array.isArray(mOperations)) {
        return _bluebird2.default[bRunInSequence ? "each" : "map"](mOperations, _run);
    }
    return _run(mOperations);
};

exports.connect = _fConnect;
exports.run = _fRun;