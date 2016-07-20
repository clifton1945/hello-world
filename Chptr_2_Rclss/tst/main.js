/**
 *  main.js -> SET each Verse CSD as a function of their Space parameters.
 *  IN Chptr_2_Rclss/.../tst/
 *  main.js -> SET each Verse CSD as a function of their Space parameters.
 */

// requires
var R = require('ramda');
var C_Both = require('../src/h').C_Both;

var n_Scale = .75;
var wt_opacity = R.compose(R.toString, R.multiply(n_Scale), parseFloat);
var wt_fontSize_px = R.compose(R.flip(R.concat)('px'), R.toString, R.multiply(n_Scale), parseFloat);
var wt_fontSize_Prcnt = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(n_Scale), parseFloat);
/**
 *      _set_trgtStyles: CSD D -> E: trgt -> mutated E:trgt
 * @param csd
 * @param e_trgt
 */
// const _set_trgtElem = R.curry(
//     (csd, e_trgt)=> Object.assign(e_trgt.style, csd)
// );
var test = require('tape');
var CUT, TST;
//GLOBALS
var t_csd;

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var e_aVerse = nl_allVerses.item(2);
C_Both(JSON.stringify(e_aVerse.innerText));

var trnsfrms = {
    opacity: wt_opacity,
    fontSize: wt_fontSize_px,
};
// MAIN CodeUnderTest
var _style_CSD = require('./f_d_evolveDict');

test('0 ***** main: evolve a hard coded CSD', function (t) {
    t_csd = {id: 0, fontSize: '100%', opacity: '1.0', textAlign: 'center'};
    var RET = R.evolve(trnsfrms)(t_csd);
    t.deepEquals(RET.opacity, '0.75', 'opacity ->');
    t.end();
});
test('1 ***** main: see a testDoc.html Elem', function (t) {
    var e_aVerse = nl_allVerses.item(2);
    C_Both(JSON.stringify(nl_allVerses.length ) + ' length.');// -> "" no opacity set yet LATER: look for the CSS set  opacity
    C_Both(JSON.stringify(t_csd) + ' default.');// -> "" no opacity set yet LATER: look for the CSS set  opacity
    t.equals(e_aVerse.innerText, 'chptr:1 verse:3 ndx:2', 'this Elem.innerText');
    t.end();
});
test('2 ***** main: evolve a testDoc.html CSD', function (t) {
    var RET = e_aVerse.style;
    t.equals( R.isEmpty(RET.opacity), true,"opacity isEmpty.");
    t.deepEquals(RET.opacity, '', 'opacity -> "".');
    // MUST FORCE the opacity property to NOT BE empty !!
    RET = e_aVerse.style.opacity = '1.0';// dummy
    RET = R.evolve(trnsfrms)(e_aVerse.style);//-> NOW evolve works!
    t.deepEquals(RET.opacity, '0.75', 'after not empty opacity -> 0.75');
    t.end();
});
test('3 ***** main: getComputerStyles ', function (t) {
    var e_aVerse = nl_allVerses.item(2);
    var computedStyle = window.getComputedStyle(e_aVerse);
    t.equals( R.isEmpty(computedStyle.backgroundColor), false,"backgroundColor is NOT Empty.");
    t.equals(computedStyle.backgroundColor, 'rgba(0, 0, 0, 0)', 'backgroundColor -> "rgba(0, 0, 0, 0)".');
    t.end();
});
test('4 ***** main: evolve a getComputerStyles.opacity ', function (t) {
    var e_aVerse = nl_allVerses.item(2);
    var computedStyle = window.getComputedStyle(e_aVerse);
    t.equals( R.isEmpty(computedStyle.opacity), false,"opacity is NOT Empty.");
    t.equals(computedStyle.opacity, '1', 'opacity -> "1".');
    computedStyle = R.evolve(trnsfrms)(computedStyle);//-> NOW evolve works!
    t.deepEquals(computedStyle.opacity, '0.75', 'evolved opacity -> 0.75');
    t.end();
});
test('5 ***** main: evolve a getComputerStyles.fontSize ', function (t) {
    var e_aVerse = nl_allVerses.item(1);
    var computedStyle = getComputedStyle(document.body, null);
    t.equals( R.isEmpty(computedStyle.fontSize), false,"fontSize is NOT Empty.");
    t.equals(computedStyle.fontSize, '20px', 'fontSize -> "20px".');
    computedStyle = R.evolve(trnsfrms)(computedStyle);//-> evolve USED wt_fontSize_px!
    t.deepEquals(computedStyle.fontSize, '15px', 'evolved fontSize -> 15px');
    t.end();
});
test('6 ***** main: assure I SEE style->#tstVerse{font-size: 30px;', function (t) {
    var e_aVerse = document.querySelector('#tstVerse');//->'chptr:2 verse:6 ndx:5'
    t.equals(e_aVerse.innerText, 'chptr:2 verse:6 ndx:5', 'tstVerse');
    var computedStyle = window.getComputedStyle(e_aVerse);
    // var computedStyle = getComputedStyle(document.body, null);// WATCH OUT not same as window.getComputedStyle(e_aVerse)
    C_Both(JSON.stringify(computedStyle.fontSize));
    t.equals( R.isEmpty(computedStyle.fontSize), false,"fontSize is NOT Empty.");
    t.equals(computedStyle.fontSize, '30px', 'styled fontSize -> "30px".');
    computedStyle = R.evolve(trnsfrms)(computedStyle);//-> evolve USED wt_fontSize_px!
    t.deepEquals(computedStyle.fontSize, '22.5px', 'evolved fontSize 30px -> 22.5px');
    C_Both(JSON.stringify(computedStyle.fontSize));
    t.end();
});
test('7 ***** main: evolve a style->#tstVerse{font-size: 30px;', function (t) {
    var e_aVerse = document.querySelector('#tstVerse');//->'chptr:2 verse:6 ndx:5'
    t.equals(e_aVerse.innerText, 'chptr:2 verse:6 ndx:5', 'tstVerse');
    var computedStyle = window.getComputedStyle(e_aVerse);
    t.equals(computedStyle.fontSize, '30px', 'styled fontSize -> "30px".');
    var n_Scale = 0.5;
    wt_fontSize_px = R.compose(R.flip(R.concat)('px'), R.toString, R.multiply(n_Scale), parseFloat);
    trnsfrms.fontSize = wt_fontSize_px;
    computedStyle = R.evolve(trnsfrms)(computedStyle);//-> evolve USED wt_fontSize_px!
    t.deepEquals(computedStyle.fontSize, '15px', 'evolved fontSize 30px -> 15px');
    C_Both(JSON.stringify(computedStyle.fontSize));
    e_aVerse.style.fontSize = computedStyle.fontSize;
    t.deepEquals(e_aVerse.style.fontSize, '15px', 'evolved fontSize 30px -> 15px');
    t.end();
});
