/**
 *  main.js IN Chptr_2_Rclss/.../tst/
 *  1607141 @1152-> WIP #2 using html nodes.
 *      @0848-> STABLE testing evolve a CSD. evolve trnsfrms DO NOT WORK ON an empty style property!!!
 *  160711 @0532 -> paradigm shift: add transforms!!
 *      Use one step at a time.
 *      DONE #1 1 dict, 1 property 1 transform evolve the property
 *      #2 1 HTML Elem, 1 Prop evolve w/ 1 transform'.
 *      #3 keep adding transforms

 */

var R = require('ramda');

var n_Scale = .75;
var wt_opacity = R.compose(R.toString, R.multiply(n_Scale), parseFloat);
var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(n_Scale), parseFloat);

// requires
var C_Both = require('../src/h').C_Both;
var test = require('tape');
//GLOBALS
var CUT, RET, TST;
var t_csd;

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var e_aVerseCSD = nl_allVerses.item(0);
C_Both(JSON.stringify(e_aVerseCSD.innerText));

var trnsfrms = {
    opacity: wt_opacity,
    id: R.concat('should show ')
};
// MAIN CodeUnderTest
CUT = R.evolve(trnsfrms);

test('#2 ***** main: evolve a testDoc.html CSD', function (t) {
    RET = e_aVerseCSD.style;
    t.equals( R.isEmpty(RET.opacity), true,"opacity isEmpty.");
    t.deepEquals(RET.opacity, '', 'opacity -> "".');
    // force the opacity property to !== '';
    RET = e_aVerseCSD.style.opacity = '1.0';// dummy
    RET = R.evolve(trnsfrms)(e_aVerseCSD.style);//->
    t.deepEquals(RET.opacity, '0.75', 'opacity ->0.75');
    t.end();
});
test('#1 ***** main: see a testDoc.html Elem', function (t) {
    RET = e_aVerseCSD;
    // C_Both(JSON.stringify(t_csd) + ' default.');// -> "" no opacity set yet LATER: look for the CSS set  opacity
    t.equals(RET.innerText, 'chptr:1 verse:1 ndx:0', 'this Elem.innerText');
    t.end();
});
test('#0 ***** main: evolve a hard coded CSD', function (t) {
    t_csd = {id: 0, fontSize: '100%', opacity: '1.0', textAlign: 'center'};
    RET = R.evolve(trnsfrms)(t_csd);
    t.deepEquals(RET.id, 'should show 0', 'id -> ');
    t.deepEquals(RET.opacity, '0.75', 'opacity ->');
    t.end();
});

