/**
 *  main.js IN Chptr_2_Rclss/.../tst/
 *  160711 @0532 -> paradigm shift: add transforms!!
 *      Use one step at a time.
 *      #1 1 dict, 1 property 1 transform evolve the property
 *      #2 1 NL, 1 Prop 1 transform evolve
 *      #2 1 NL, 1 Prop 2 transforms evolve
 *      #3 keep adding transforms

 */

var R = require('ramda');
var f_trnsfrm_opacity = R.multiply(.5);

var n_Scale = .75;
var wt_opacity = R.compose(R.toString, R.multiply(n_Scale), parseFloat);
var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(n_Scale), parseFloat);

// tests
var C_Both = require('../src/h').C_Both;
var C_It = require('../src/h').C_It;
var test = require('tape');
var trnsfrms = {
    opacity:  wt_opacity,
    id: R.concat('should show ')
};
var d_data = {id:0, fontSize: '100%', opacity:'1.0', textAlign:'center'};
var RET = R.evolve(trnsfrms, d_data);
C_Both(JSON.stringify(RET));
var TST = RET.id;

test('#1 ***** main: evolve dict', function (t) {
    t.deepEquals(TST, 'should show 0', 'id -> msg');
    t.end();
});

