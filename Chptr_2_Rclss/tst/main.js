/**
 *  main.js IN Chptr_2_Rclss/.../tst/
 *  160712 -> BEGIN ADDING transforms
 *  -> getComputedStyles WORKS!!
 *      @0554 CSDs from getComputedStyles ARE RECOGNIZED BY evolve
 *      so I do not have to provide a dummy csd
 *      @0516 RET is now test local not global
 *  160711
 *      @1819 debugging WORKS NOW
 *      for tst/main.js and tst/index.html and main_bundle.js
 *          New WS version 2016.2
 *          ADDED Book to index.html
 *      @1222    div set class-'vers' FROM 'verse' IN Job_1_to_6.html to be compatible with testDoc.html
 *      @1152-> WIP #2 using html nodes.
 *      @0848-> STABLE testing evolve a CSD. evolve trnsfrms DO NOT WORK ON an empty style property!!!
 *      @0532 -> paradigm shift: add transforms!!
 *      Use one step at a time.
 *      DONE #1 1 dict, 1 property 1 transform evolve the property
 *      #2 1 HTML Elem, 1 Prop evolve w/ 1 transform'.
 *      #3 keep adding transforms
 */

// requires
var R = require('ramda');
var C_Both = require('../src/h').C_Both;

var n_Scale = .75;
var wt_opacity = R.compose(R.toString, R.multiply(n_Scale), parseFloat);
var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(n_Scale), parseFloat);

var test = require('tape');
//GLOBALS
var CUT, TST;
var t_csd;

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var e_aVerseCSD = nl_allVerses.item(2);
C_Both(JSON.stringify(e_aVerseCSD.innerText));

var trnsfrms = {
    opacity: wt_opacity,
    id: R.concat('should show ')
};
// MAIN CodeUnderTest
CUT = R.evolve(trnsfrms);



test('0 ***** main: evolve a hard coded CSD', function (t) {
    t_csd = {id: 0, fontSize: '100%', opacity: '1.0', textAlign: 'center'};
    var RET = R.evolve(trnsfrms)(t_csd);
    t.deepEquals(RET.id, 'should show 0', 'id -> ');
    t.deepEquals(RET.opacity, '0.75', 'opacity ->');
    t.end();
});
test('1 ***** main: see a testDoc.html Elem', function (t) {
    var e_aVerseCSD = nl_allVerses.item(2);
    var RET = e_aVerseCSD;
    C_Both(JSON.stringify(nl_allVerses.length ) + ' length.');// -> "" no opacity set yet LATER: look for the CSS set  opacity
    C_Both(JSON.stringify(t_csd) + ' default.');// -> "" no opacity set yet LATER: look for the CSS set  opacity
    t.equals(RET.innerText, 'chptr:1 verse:3 ndx:2', 'this Elem.innerText');
    t.end();
});
test('2 ***** main: evolve a testDoc.html CSD', function (t) {
    var RET = e_aVerseCSD.style;
    t.equals( R.isEmpty(RET.opacity), true,"opacity isEmpty.");
    t.deepEquals(RET.opacity, '', 'opacity -> "".');
    // MUST FORCE the opacity property to NOT BE empty !!
    RET = e_aVerseCSD.style.opacity = '1.0';// dummy
    RET = R.evolve(trnsfrms)(e_aVerseCSD.style);//-> NOW evolve works!
    t.deepEquals(RET.opacity, '0.75', 'after not empty opacity -> 0.75');
    t.end();
});
test('3 ***** main: getComputerStyles ', function (t) {
    var e_aVerseCSD = nl_allVerses.item(2);
    var RET = window.getComputedStyle(e_aVerseCSD);
    t.equals( R.isEmpty(RET.backgroundColor), false,"backgroundColor is NOT Empty.");
    t.equals(RET.backgroundColor, 'rgba(0, 0, 0, 0)', 'backgroundColor -> "rgba(0, 0, 0, 0)".');
    t.end();
});
test('4 ***** main: evolve a getComputerStyles ', function (t) {
    var e_aVerseCSD = nl_allVerses.item(2);
    var RET = window.getComputedStyle(e_aVerseCSD);
    t.equals( R.isEmpty(RET.opacity), false,"opacity is NOT Empty.");
    t.equals(RET.opacity, '1', 'opacity -> "1".');
    RET = R.evolve(trnsfrms)(RET);//-> NOW evolve works!
    t.deepEquals(RET.opacity, '0.75', 'evolved opacity -> 0.75');
    t.end();
});

