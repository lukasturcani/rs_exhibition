/**
 * Turns the "next" button into a hyperlink to the next page.
 *
 * The hyperlink holds information about which box was selected after the "#"
 * symbol.
 */
function wrapNext(data) {
    // `prev_data` consists of the box numbers selected at each previous page.
    var prev_data = window.location.href.split('#');
    // If the there was no previous data, use an empty string.
    if (prev_data.length == 1) {
        prev_data = "";
    }
    else {
        prev_data = prev_data[1];
    }

    // Figure out the name of the next html page by looking at the number of the
    // current html file and adding 1.
    var n = window.location.href.split("assembler");
    n = parseInt(n[n.length-1].split(".html")[0]) + 1;
    // If the current html page is the last, make the next button return to the
    // first html page.
    if (n == 7) {
        n = 1;
    }
    // Make the "next" button into a hyperlink.
    $('.next_button').wrap('<a href="assembler'+ n + '.html#' + prev_data + data + '"></a>');
}

/**
 * Turns the "back" button into a hyperlink to the previous page.
 *
 * The hyperlink is edited so that the most recently added box number is
 * removed.
 */
function wrapBack() {
    // If the "#" symbol is not present in the hyperlink, it does not need
    // to be edited.
    if (!window.location.href.includes('#')) {
        return;
    };

    // When going back to the previous page, remove the previously selected
    // box number from the hyperlink.

    // `prev_data` consists of the box numbers selected at each previous page.
    var prev_data = window.location.href.split('#')[1];
    // When going to the previous page from "assembler5.html", the selected
    // box numbers do not change. Otherwise, remove the last number added.
    if (!window.location.href.includes('assembler5')){
        prev_data = prev_data.slice(0, prev_data.length-1);
    }
    // Figure out the name of the previous html page by looking at the number
    // of the current html file and subtracting 1.
    var n = window.location.href.split("assembler");
    n = parseInt(n[n.length-1].split(".html")[0]) - 1;
    // Make the "back" button into a hyperlink.
    $('.back_button').wrap('<a href="assembler'+ n + '.html#' + prev_data + '"></a>');

}


$(document).ready(function() {

    wrapBack();

    /**
     * Actions when a box is clicked.
     */
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
