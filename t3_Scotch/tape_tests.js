/**
 * Created by CLIF on 6/29/2016.
 */

var test = require('tape');
test('A passing test', (t) => {
    t.pass('This test will pass.');
    t.end();
});
test('Assertions with tape.', (t) => {
    const expected = 'something to test';
    const actual = 'Something to test';
    t.equal(actual, expected,
        'Given two mismatched values, .equal() should produce a nice bug report');
    t.end();
});
