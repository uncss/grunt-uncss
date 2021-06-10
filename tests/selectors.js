/* eslint-env mocha */

'use strict';

const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const uncss = require('uncss');

const readFile = file => fs.readFileSync(path.join(__dirname, file), 'utf-8');

let rawcss = readFile('output.css');
const urlcss = readFile('outputUrl.css');
const tests = fs.readdirSync(path.join(__dirname, 'fixtures/'));

/* Only read through CSS files */
for (const test of tests) {
    if (test.includes('.css')) {
        readFile(`fixtures/${test}`);
    }
}

/*
Tests without grunt-uncss
*/
describe('uncss', () => {
    /* Wait until uncss finished doing its thing before running our tests */
    before(done => {
        /* New api from issue #44 */
        uncss(readFile('index.html'), {
            csspath: 'tests'
        }, (err, output) => {
            if (err) {
                throw err;
            }

            rawcss = output;
            done();
        });
    });

    it('should output something', () => {
        expect(rawcss).not.to.equal(false);
        expect(urlcss).not.to.equal(false);
    });

    it('should not be an empty string', () => {
        expect(rawcss).to.have.length.above(0);
    });

    it('should read .uncssrc files', done => {
        uncss(readFile('index.html'), {
            csspath: 'tests',
            report: true,
            uncssrc: path.normalize('tests/.uncssrc')
        }, (err, res, report) => {
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
    for (const test of tests) {
        it(`should handle ${test.split('.')[0]}`, () => {
            expect(rawcss).to.not.include.string(readFile(`unused/${test}`));
        });
    }
});
