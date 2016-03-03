/* leny/repanse
 *
 * /src/main.js - A simple wrapper around RethinkDB
 *
 * coded by leny@flatLand!
 * started at 03/03/2016
 */

import Promise from "bluebird";
import RethinkDB from "rethinkdb";

let _fConnect,
    _fRun,
    _oConnection;

_fConnect = function( oConnectOptions ) {
    return new Promise( ( fResolve, fReject ) => {
        RethinkDB
            .connect( oConnectOptions )
            .catch( fReject )
            .then( ( oNewConnection ) => {
                _oConnection = oNewConnection;
                fResolve();
            } );
    } );
};

_fRun = function( mOperations, bRunInSequence = false ) {
    let _run = ( oOperation ) => {
        return oOperation.run( _oConnection );
    };

    if ( Array.isArray( mOperations ) ) {
        return Promise[ bRunInSequence ? "each" : "map" ]( mOperations, _run );
    }
    return _run( mOperations );
};

export {
    _fConnect as connect,
    _fRun as run
};
