/**
 * Created by CLIF on 6/29/2016.
 */

var testTape = require('tape');
testTape('A passing test', (assert) => {
    assert.pass('This test will pass.');
    assert.end();
});

testTape('Assertions with tape.', (assert) => {
    const expected = 'something to test';
    const actual = 'SOMEthing to test';

    assert.equal(actual, expected,
        'Given two mismatched values, .equal() should produce a nice bug report');

    assert.end();
});
