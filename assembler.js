function removeHighlight(sel, lk, bb, top) {
    if (lk) {
        sel.lk.removeClass('selected');
    }
    if (bb) {
        sel.bb.removeClass('selected');
    }
    if (top) {
        sel.top.removeClass('selected');
    }
}

function addHighlight(sel, item, lk, bb, top) {
    if (lk) {
        sel.lk = item;
    }
    if (bb) {
        sel.bb = item;
    }
    if (top) {
        sel.top = item;
    }
}

unopt_cages = {};
opt_cages = {};

$(document).ready(function() {

    // Render molecules and topologies.


    var lk1 = new GLmol('lk1');
    var lk2 = new GLmol('lk2');
    var lk3 = new GLmol('lk3');
    var lk4 = new GLmol('lk4');
    var lk5 = new GLmol('lk5');
    var lk6 = new GLmol('lk6');

    var bb1 = new GLmol('bb1');
    var bb2 = new GLmol('bb2');
    var bb3 = new GLmol('bb3');
    var bb4 = new GLmol('bb4');
    var bb5 = new GLmol('bb5');
    var bb6 = new GLmol('bb6');

    var t1 = new GLmol('t1');
    var t2 = new GLmol('t2');
    var t3 = new GLmol('t3');

    var selected = {lk : $('#lk1'),
                    bb : $('#bb1'),
                    top: $('#t1'),
                    unopt : "t1lk1bb1"}

    $('.selectable').click(function() {
        // Clicking on a selectable element, first locates the its
        // class. The highlighted element of the that class then has
        // the highlight removed. The clicked on element then gets
        // highlighted. Finally the cage displayed in the main window
        // is reloaded.

        removeHighlight(selected, $(this).hasClass('lk'), $(this).hasClass('bb'), $(this).hasClass('top'));
        $(this).addClass('selected');
        addHighlight(selected, $(this), $(this).hasClass('lk'), $(this).hasClass('bb'), $(this).hasClass('top'));
        var cage_name = selected.top[0].id + selected.lk[0].id + selected.bb[0].id;
        main.loadMoleculeStr(false, unopt_cages[cage_name]);
        selected.unopt = cage_name;
    });

    $('button').click(function() {
        main.loadMoleculeStr(false, opt_cages[selected.unopt]);
    });

    var main = new GLmol('main');


});
