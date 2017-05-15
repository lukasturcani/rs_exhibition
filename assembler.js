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
    var t1 = new GLmol('1');
    var t2 = new GLmol('2');
    var t3 = new GLmol('3');
    // var t4 = new GLmol('4');
    // var t5 = new GLmol('5');

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
