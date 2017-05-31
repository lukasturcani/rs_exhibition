// The variables unopt_cages and opt_cages are defined in the file
// "cagesfile".

function wrapNext(data) {
    var prev_data = window.location.href.split('#');
    if (prev_data.length == 1) {prev_data = "";}
    else {prev_data = prev_data[prev_data.length-1];}
    var n = window.location.href.split("assembler");
    n = parseInt(n[n.length-1].split(".html")[0]) + 1;
    if (n == 7) {n = 1;}
    $('.next_button').wrap('<a href="assembler'+ n + '.html#' + prev_data +  data + '"></a>');
}

function wrapBack() {
    if (!window.location.href.includes('#')) {return;};
    var prev_data = window.location.href.split('#')[1];
    if (!window.location.href.includes('assembler5')){
        prev_data = prev_data.slice(0, prev_data.length-1);
    }
    var n = window.location.href.split("assembler");
    n = parseInt(n[n.length-1].split(".html")[0]) - 1;
    $('.back_button').wrap('<a href="assembler'+ n + '.html#' + prev_data + '"></a>');

}


$(document).ready(function() {

    wrapBack();

    $(document).on("click touchstart", "#pore_button", function() {
        $(this).toggleClass('selectedToggle');

    });
    $(document).on("click touchstart", "#vdw_button", function() {
        $(this).toggleClass("selectedToggle");

    });


    $(document).on("click touchstart", ".selectable", function() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        c = [for (x of this.classList) if (x=='bb' || x=='lk' || x=='top') x][0];

        $('.next_button').addClass('ready');
        wrapNext(this.id);

    });


});

$(document).ready(function() {

    // Render molecules and topologies.


    // var lk1 = new GLmol('lk1');
    // var lk2 = new GLmol('lk2');
    // var lk3 = new GLmol('lk3');
    // var lk4 = new GLmol('lk4');
    // var lk5 = new GLmol('lk5');
    // var lk6 = new GLmol('lk6');
    // var lk7 = new GLmol('lk7');
    // var lk8 = new GLmol('lk8');
    // var lk9 = new GLmol('lk9');
    //
    // var bb1 = new GLmol('bb1');
    // var bb2 = new GLmol('bb2');
    // var bb3 = new GLmol('bb3');
    // var bb4 = new GLmol('bb4');
    // var bb5 = new GLmol('bb5');
    // var bb6 = new GLmol('bb6');
    // var bb7 = new GLmol('bb7');
    // var bb8 = new GLmol('bb8');
    // var bb9 = new GLmol('bb9');
    //
    // var t1 = new GLmol('t1');
    // var t2 = new GLmol('t2');
    // var t3 = new GLmol('t3');
    // var t4 = new GLmol('t4');
    // var t5 = new GLmol('t5');

    // var selected = {lk : $('#lk1'),
    //                 bb : $('#bb1'),
    //                 top: $('#t1'),
    //                 unopt : "t1lk1bb1"}
    //
    // $('.selectable').on("click touchstart", function() {
    //     // Clicking on a selectable element, first locates the its
    //     // class. The highlighted element of the that class then has
    //     // the highlight removed. The clicked on element then gets
    //     // highlighted. Finally the cage displayed in the main window
    //     // is reloaded.
    //
    //     // removeHighlight(selected, $(this).hasClass('lk'), $(this).hasClass('bb'), $(this).hasClass('top'));
    //     // $(this).addClass('selected');
    //     // addHighlight(selected, $(this), $(this).hasClass('lk'), $(this).hasClass('bb'), $(this).hasClass('top'));
    //     var cage_name = selected.top[0].id + selected.lk[0].id + selected.bb[0].id;
    //     main.loadMoleculeStr(false, unopt_cages[cage_name]);
    //     selected.unopt = cage_name;
    // });
    //
    // $('button').on("click tap", function() {
    //     main.loadMoleculeStr(false, opt_cages[selected.unopt]);
    // });
    //
    // var main = new GLmol('main');


});
