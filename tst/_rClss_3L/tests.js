/**
 * Created by CLIF on 7/1/2016.
 */

var test = require('tape');

test('expect 4 rClss.pst verses && 5 other', function (t) {
    t.equal(CUT[0].length, 4);
    t.equal(CUT[1].length, 5);
    t.end();
});
