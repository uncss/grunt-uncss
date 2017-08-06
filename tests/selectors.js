/* eslint-env mocha */

'use strict';

var expect = require('chai').expect,
    fs     = require('fs'),
    path   = require('path'),
    uncss  = require('uncss');

var readFile = function (file) {
    return fs.readFileSync(path.join(__dirname, file), 'utf-8');
};

var rawcss = readFile('output.css'),
    urlcss = readFile('outputUrl.css'),
    tests  = fs.readdirSync(path.join(__dirname, 'fixtures/'));

/* Only read through CSS files */
tests.forEach(function (test) {
    if (test.indexOf('.css') > -1) {
        readFile('fixtures/' + test);
    }
});

/*
Tests without grunt-uncss
*/
describe('uncss', function () {
    /* Wait until uncss finished doing its thing before running our tests */
    before(function (done) {
        /* new api from issue #44 */
        uncss(readFile('index.html'), {
            csspath: 'tests'
        }, function (err, output) {
            if (err) {
                throw err;
            }
            rawcss = output;
            done();
        });

    });

    it('should output something', function () {
        expect(rawcss).not.to.equal(false);
        expect(urlcss).not.to.equal(false);
    });

    it('should not be an empty string', function () {
        expect(rawcss).to.have.length.above(0);
    });

    it('should read .uncssrc files', function (done) {
        uncss(readFile('index.html'), {
            csspath: 'tests',
            report: true,
            uncssrc: path.normalize('tests/.uncssrc')
        }, function (err, res, report) {    // eslint-disable-line consistent-return
            if (err) {
                return done(err);
            }
            expect(err).to.equal(null);
            expect(res).to.equal(rawcss);
            expect(report.original).not.to.equal(null);
            done();
        });
    });

    /* We're testing that the CSS is stripped out from the result,
       not that the result contains the CSS in the unused folder. */
    tests.forEach(function (test) {
        it('should handle ' + test.split('.')[0], function () {
            expect(rawcss).to.not.include.string(readFile('unused/' + test));
        });
    });

});
