/**
 * _rClss_3L/tests.js
 * 160701
 *  @10:55  trying to test main but do not know how to apply test to main
 */

var test = require('tape');

test('exp pst:3, cur:2, fut:4', function (t) {
    t.equal(pst.length, 3);
    t.equal(cur.length, 5);
    t.equal(fut.length, 4);
    t.end();
});
