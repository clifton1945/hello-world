/**
 *  main.js
 *  160826
 *      @1720   ->WIP  handle_keyEvents IS WORKING BUT
 *      (1) NO initial rendering until a key press!
 *      (2) NEED the APPLY weighted CSD to all spans
 *      @1218 -> WIP   trying to pass set_RclssDIVs function to handle_keyEvents
 *  IN FILE: main.js -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */
//
"use strict";
var h = require('./src/h');
var C_Both = h.C_Both;
C_Both("IN  main.js");
// ------------------    REQUIRES
var R = require('ramda');
var t = require('assert');
//      -------------    keyEVENT Functions  ------------------------
var h_vE = require('./src/bind_keyEvents').handleKeyPresses;
var handle_keyEvents = (fn) => h_vE(fn);

// This TEST FN PASSED is seen on keyPresses
var aTEST_Fn = (n)=> {
    var cnt = n;
    return d => {
        console.log(`cnt:${cnt} + ${d} -> ${cnt + d}`);
        return cnt = cnt + d;
    }
};
var N = 5;
N = handle_keyEvents(aTEST_Fn(N));// INVOKED and works

//      -------------    Rclss DIV: List or STR of spans Functions  ------------------------
/**
 *      -----   set_RclssDIVs::(N_curRclssSize,L_spans,N_curBegNdx) -> L
 * @param sizcur: Num of cur Rclss Spans
 * @param l: List of all Spans
 * @param beg: N ndx of the first/beginning cur Rclss Span
 * @return l: List of 3 RclssLists of its SPANs
 */
var set_RclssDIVs = require('./src/set_RclssDIVs').set_RclssDIVs;// (N_cur, L_spans) -> N_curSpansBegin -> L:[[pst],[cur],[fut]]
// ------------------  Rclss DIV:  DEFINITIONS/CONSTANTS -----------set here SO THAT the CSS styles are in effect for the DIV
var SPAN_NL = document.querySelectorAll('.Chptr_31 span');// -> NL[52]:: [span, spam, ...]
/**
 *      -----   _set_spanSTR_L_from_:: L_Elems -> L_STR
 *  TODO get rid of the commas between spans
 */
var _set_spanSTR_L_from_ = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');

/**
 * ------------ VISUALLY TEST of Rclss DIV REFRESHED eventually by key Events: handle_keyEvents(N:)-------------
 */
var stub_curSizN = 2;
var stub_spanSTR_L = _set_spanSTR_L_from_(SPAN_NL);// -> Array[52]:: [S:"<span> 1 And...", S, ...]
var stub_curRclssBegN = 5;// FIX to 0 when 0/L limits in place
// OK NOW partial APPLY
let set_Rclss_L_w_ = set_RclssDIVs(stub_curSizN, stub_spanSTR_L);// partialed. N_page  -> L_
// NOW slice the big list into 3 Lists
let L_Rclss = set_Rclss_L_w_(stub_curRclssBegN);

// now try to increment the 3 RlcssDIV children
let aTEST_set_Rclss_L_w_ = R.curry(
    (n_init)=> {// N_init -> N_step  ->  L_Rclsses
    var cnt = n_init;
    return n_step => {// N ->
        console.log(` curBeg:${cnt} + ${n_step} -> ${cnt + n_step}`);
        cnt = cnt + n_step;
        var RET = set_Rclss_L_w_(cnt);
        // maybe this works
        pst_div.innerHTML = RET[0]; // -> S[nome N]:"<spam 1 And.....
        cur_div.innerHTML = RET[1];
        fut_div.innerHTML = RET[2];
        return RET
    }
});
// -------------- this is CUT -----------------------
L_Rclss = handle_keyEvents(aTEST_set_Rclss_L_w_(stub_curRclssBegN));// N -> L
// Each of the 3 Rclss DIVs are reassigned a single Str of it's SPANs
// pst_div.innerHTML = L_Rclss[0]; // -> S[nome N]:"<spam 1 And.....
// cur_div.innerHTML = L_Rclss[1];
// fut_div.innerHTML = L_Rclss[2];

/**
 * ----------------- NOW   setting each Rclss Span Styles -- Visual Confirm w/ index.html::   ---------------------------
 */
/**
 *      ----- set_SPAN_Style::(D, N) -> Fn:( (E, N, L) -> E))
 */
var set_SPAN_Style = R.curry(require('./src/set_anElem_Style').set_SPAN_Style);//
/**
 *  ----------------- WIP ON pst_div VISUAL TESTS-------------------------
 * @type {HTMLElement[]}
 */
var CUT, RET;
// var L = R.reverse(pst_div.children);// -> HTMLCollection[N]:: [span,[s0, s1,...]
// var rclss_wtRng = {smlWt: 0.1, begWt: 0.8};
// NOTE:  these above two definitions produce the same tapering as the two below.
var L = pst_div.children;// -> HTMLCollection[N]:: [span,[s0, s1,...]
var rclss_wtRng = {endWt: 0.85, begWt: 0.10};
var rclss_fmlyLen = L.length;
CUT = set_SPAN_Style(rclss_wtRng, rclss_fmlyLen);
// RET = R.addIndex(R.map)(CUT, L); // THIS WORKS
RET = R.addIndex(R.map)(CUT)(L); // THIS WORKS
// RET = R.addIndex(R.map(CUT, L)); NOTE this NOT taper the spans

/**
 *  ----------------- WIP ON fut_div VISUAL TESTS -------------------------
 * @type {HTMLElement[]}
 */
L = fut_div.children;// -> HTMLCollection[N]:: [span,[s0, s1,...]
rclss_fmlyLen = L.length;
rclss_wtRng = {endWt: 0.1, begWt: 0.90};
CUT = set_SPAN_Style(rclss_wtRng, rclss_fmlyLen);
RET = R.addIndex(R.map)(CUT)(L);//Elem,N,L -> [Elem,...]

C_Both("OUT main.js");
// C_Both("LOOK AT TODOS");
