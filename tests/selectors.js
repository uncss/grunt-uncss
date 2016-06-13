/* jshint mocha:true */
'use strict';

var expect = require( 'chai' ).expect,
    fs     = require( 'fs' ),
    path   = require( 'path' ),
    uncss  = require( 'uncss' );

/* Read file sync sugar. */
var rfs = function ( file ) {
    return fs.readFileSync( path.join( __dirname, file ), 'utf-8' ).toString();
};

var rawcss = rfs( 'output.css' ),
    urlcss = rfs( 'outputUrl.css' ),
    tests  = fs.readdirSync( path.join( __dirname, 'fixtures/' ) ),
    input  = '';

/* Only read through CSS files */
tests.forEach(function ( test, i ) {
    if ( test.indexOf( '.css' ) > -1 ) {
        input += rfs( 'fixtures/' + test );
    } else {
        tests.splice( i, 1 );
    }
});

/*
Tests without grunt-uncss
*/
describe( 'uncss', function () {
    /* Wait until uncss finished doing its thing before running our tests */
    before( function ( done ) {
        /* new api from issue #44 */
        uncss( rfs( 'index.html' ), { csspath: 'tests' }, function ( err, output ) {
            if ( err ) {
                throw err;
            }
            rawcss = output;
            done();
        } );

    });

    it( 'should output something' , function () {
        expect( rawcss ).not.to.equal( false );
        expect( urlcss ).not.to.equal( false );
    });

    it( 'should not be an empty string' , function () {
        expect( rawcss ).to.have.length.above( 0 );
    });

    it( 'should read .uncssrc files', function () {
        uncss( rfs('index.html'), { uncssrc: path.normalize('tests/.uncssrc') }, function ( err, res, report ) {
            expect( err ).to.equal( null );
            expect( res ).to.equal( rawcss );
            expect( report.original ).not.to.equal( null );
        } );
    });

    /* We're testing that the CSS is stripped out from the result,
       not that the result contains the CSS in the unused folder. */
    tests.forEach( function ( test ) {
        it( 'should handle ' + test.split( '.' )[0], function () {
            expect( rawcss ).to.not.include.string( rfs( 'unused/' + test ) );
        });
    });

});
