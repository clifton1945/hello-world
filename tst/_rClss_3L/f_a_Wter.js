/**
 * f_a_Wter.js
 *  160702
 *      @ 1948  f_n_Wter_(S:name of Rclss_Csd dictionary)  STABLE AND TESTED
 *      @ 12341   brought over FROM  C_scrip_FP/../wtEr_tests.js
 */
"use strict";
var R = require('ramda');
var test = require('tape');
//GLOBAL:
var CUT, RET, TST, EXP, MSG = ``;

//----------------------  Test Stubs
let n_stb_Ndx = 0;
let l_stb_Sibs = [0,1,2,3,4,5];
//---------------------- Code Under Test: wtFunctions


/**
 *      f_n_Len:; L:[]-> N:len || 1
 * @param l_list
 * @param n_ndx
 * @returns {number}
 */
let f_n_Len = l_list => {
    var len = R.length(l_list);
    return len > 0 ? len: 1
};
test("n_Len::-> N ", function(t){
    t.equals(f_n_Len([]),1, "n_Len w/ L:[0]->1 ");
    t.equals(f_n_Len([0,1,2,3,4,5]),6,"n_Len w/ L:[,,,,,] ");
    t.end();
});

/**
 *      f_Wter_pst:: L:[sibsLst] -> N:ndx -> ( *-> N:wt)
 *      pst factor = (ndx + 1) / siblLen
 *      pst weights start small and build as they near the cur elements
 *      e.g.  n_Wter_pst([]);// get 1.0
 *      e.g.  n_Wter_pst([0, 1, 2, 3]);// get 0.25, 0.50, 0.75, 1.0
 * @private
 * @param l_lst
 * @param n_ndx
 */
var f_n_Wter_pst = (l_lst, n_ndx) => R.inc(n_ndx) / f_n_Len(l_lst);
test("n_Wter_('pst')::(L,N)-> N. ", function(t){
    t.equals(f_n_Wter_('pst')([],0), 1, "([],0)->1");
    t.equals(f_n_Wter_('pst')([0,1,2,3],0), 0.25, "([0,1,2,3],0)->1/4");
    t.equals(f_n_Wter_('pst')([0,1,2,3],3), 1, "([0,1,2,3],3)->1");
    t.end();
});

/**
 *      f_n_Wter_cur:: (L:[*], N:a)-> N:1
 *      pst factor = 1;
 *      e.g.  n_Wter_cur([0, 1, 2, 3]) -> 1
 * @private
 * @param l_lst
 * @param n_ndx
 */
var f_n_Wter_cur = (l_lst, n_ndx) => R.always(1);

/**
 *     f_Wter_fut:: L:[sibsLst] -> N:ndx -> ( *-> N:wt)
 *      fut factor = - ndx / siblLen
 *      fut weights start large near cur elements and decrease as they near the end of the elem list.
 *      e.g.  n_Wter_fut([]);// get 1.0
 *      e.g.  n_Wter_fut([0, 1, 2, 3]);// get 1, 3/4, 2/4, 1/4
 * @param l_lst
 * @param n_ndx
 */
var f_n_Wter_fut = (l_lst, n_ndx) => 1 - n_ndx / f_n_Len(l_lst);
test("f_n_Wter_fut::(L,N)-> N. ", function(t){
    t.equals(f_n_Wter_('fut')([],0), 1, "([],0)->1");
    t.equals(f_n_Wter_('fut')([0,1,2,3],0), 1, "([0,1,2,3],0)->1");
    t.equals(f_n_Wter_('fut')([0,1,2,3],3), 0.25, "([0,1,2,3],3)->1/4");
    t.end();
});

/**
 *      f_n_Wter_:: S:rClssName -> (_Wter_:: (L, N) -> N:wt)
 * @param s
 * @returns {function()}
 * @private
 */
function  f_n_Wter_(s){
    return s === 'pst' ? f_n_Wter_pst
        : s === 'cur' ? f_n_Wter_cur
        : s === 'fut' ? f_n_Wter_fut
        : null;
}



