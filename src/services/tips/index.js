/**
 * Koin Websocket Server
 *
 * @author Ashraful Sharif<sharif.ashraful@gmail.com>
 */

var Promise = require( "bluebird" );
var ws = require( "ws" );
var uuidv1 = require( "uuid/v1" );
var url = require( "url" );
var fs = require( "fs" );
var path = require( "path" );
var _ = require( "underscore" );
var Utils = require( "./lib/utils" );
var Rpc = require( "./lib/rpc-client" );

function WebsocketServer( ) {

    var me = this;
    me.config = require( "./config/app.json" );
    me.webSocketMap = { };

    me.endpoints = { };
    me.rpc = new Rpc( );

    // Token will be checked from koin-site through rpc module
    function verifyToken( ) {

    }

    // Verify websocket client before connect
    function verifyClient( info, next ) {

        var query = url.parse( info.req.url, true ).query;
        // Verify tocken
        // if( !query.token ) {
        //    return next( false, 403, "Not valid token" );
        //}

        next( true );

    }

    me.run = function run( ) {

        Promise.resolve( ).then( function loadEndpoints( ) {

            return new Promise( function( resolve, reject ) {

                fs.readdir( "endpoints", function( err, endpointNames ) {

                    if( err ) {

                        reject( err );

                    } else {

                        _.each( endpointNames, function endpointName( name ) {

                            console.log( "Loading Endpoint: ", name );
                            var handler = require( "./endpoints/" + name + "/index.js" );
                            me.endpoints[ name ] = handler;

                        });

                        resolve( );

                    }

                    // me.endpoints[ "getExchanges" ].execute( )

                });

            });

        }).then( function initWebsocket( ) {

            const wss = new ws.Server({ host: me.config.host, port: me.config.port, verifyClient: verifyClient });
            wss.on( "connection", function( socket ) {

                var id = uuidv1( );
                console.log( "websocket " + id + " connected" );

                me.webSocketMap[ id ] = socket;
                socket.on( "close", function( ) {

                    delete me.webSocketMap[ id ];
                    console.log( "websocket " + id + " disconnected" );

                });

                socket.on( "message", function( data ) {

                    try {

                        data = JSON.parse( data );
                        // console.log( data );
                        if( me.endpoints[ data.id ] ) {

                            var requestSchema = require( "./endpoints/" + data.id + "/schemas/request.json" );
                            // Validate Request Schema
                            var validation = Utils.validateReqSchema( data, requestSchema );

                            if( validation !== true ) {

                                socket.send( JSON.stringify({

                                    errors: [{
                                        "title": "BAD REQUEST",
                                        "message": validation.message,
                                        "code": validation.code,
                                        "status": validation.code
                                    }]

                                }));

                            } else {

                                me.endpoints[ data.id ].execute( data, function ( err, response ) {

                                    if( err ) {

                                        socket.send( JSON.stringify({ errors: [{

                                            "title": "Internal Error",
                                            "message": err.message,
                                            "code": 500,
                                            "status": 500

                                        }]}));

                                    } else {

                                        var responseSchema = require( "./endpoints/" + data.id + "/schemas/response.json" );

                                        // Validate Response Schema
                                        validation = Utils.validateResSchema( response, responseSchema );
                                        if( validation !== true ) {

                                            socket.send( JSON.stringify({

                                                errors: [{
                                                    "title": "BAD RESPONSE",
                                                    "message": validation.message,
                                                    "code": validation.code,
                                                    "status": validation.code
                                                }]

                                            }));

                                        } else {

                                            socket.send( JSON.stringify( response ) );

                                        }

                                    }

                                });

                            }

                        } else {

                            socket.send( JSON.stringify({

                                errors: [{
                                    "title": "NOT FOUND",
                                    "message": "The server could not find what was requested",
                                    "code": "404",
                                    "status": "404"
                                }]

                            }));

                        }

                    } catch( ex ) {

                        console.log( ex.stack );
                    }

                });

            });

        });

    };

    me.run( );

}

/**
 * Global variable
 */
global.app = new WebsocketServer( );
module.exports = app;