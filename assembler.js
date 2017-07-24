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
    if (!window.location.href.includes('#')) {
        return;
    };
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

    $(document).on('click touchstart', '.selectable', function() {
        // Remove highglight around currently selected box.
        $('.selected').removeClass('selected');
        // Add highlight around chosen box.
        $(this).addClass('selected');
        // Highlight the "next" button.
        $('.next_text').addClass('ready');
        // Save id of selected box.
        wrapNext(this.id);

    });


});
