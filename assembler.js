// The variables unopt_cages and opt_cages are defined in the file
// "cagesfile".

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

{};

$(document).ready(function() {

    // Render molecules and topologies.

    var selected = {lk : $('#lk1'),
                    bb : $('#bb1'),
                    top: $('#t1'),
                    unopt : "t1lk1bb1"}

    $("#next_button1").on("click touchstart", function() {
        $("body").load("assembler2.html");
    });
    $("#next_button2").on("click touchstart", function() {
        $("body").load("assembler3.html");
    });
    $("#next_button3").on("click touchstart", function() {
        $("body").load("assembler4.html");
    });
    $("#next_button4").on("click touchstart", function() {
        $("body").load("assembler5.html");
    });
    $("#no_button, #yes_button").on("click touchstart", function() {
        $("body").load("assembler6.html");
    });
    $("#next_button5").on("click touchstart", function() {
        $("body").load("assembler1.html");
    });


    $("#back_button1").on("click touchstart", function() {
        $("body").load("assembler1.html");
    });
    $("#back_button2").on("click touchstart", function() {
        $("body").load("assembler2.html");
    });
    $("#back_button3").on("click touchstart", function() {
        $("body").load("assembler3.html");
    });
    $("#back_button4").on("click touchstart", function() {
        $("body").load("assembler4.html");
    });


    $("#pore_button").on("click touchstart", function() {

        if ($(this).hasClass('selectedToggle')) {
            $(this).fadeTo('fast', 0.5)
        }
        else {
            $(this).fadeTo('fast', 1)
        }

        $(this).toggleClass('selectedToggle');

    });
    $("#vdw_button").on("click touchstart", function() {

        if ($(this).hasClass('selectedToggle')) {
            $(this).fadeTo('fast', 0.5)
        }
        else {
            $(this).fadeTo('fast', 1)
        }

        $(this).toggleClass('selectedToggle');

    });


    // $('.selectable').on("click touchstart", function() {
    //     // Clicking on a selectable element, first locates the its
    //     // class. The highlighted element of the that class then has
    //     // the highlight removed. The clicked on element then gets
    //     // highlighted. Finally the cage displayed in the main window
    //     // is reloaded.
    //
    //     removeHighlight(selected, $(this).hasClass('lk'), $(this).hasClass('bb'), $(this).hasClass('top'));
    //     $(this).addClass('selected');
    //     addHighlight(selected, $(this), $(this).hasClass('lk'), $(this).hasClass('bb'), $(this).hasClass('top'));
    //     var cage_name = selected.top[0].id + selected.lk[0].id + selected.bb[0].id;
    //     main.loadMoleculeStr(false, unopt_cages[cage_name]);
    //     selected.unopt = cage_name;
    // });
    //
    // $('button').on("click tap", function() {
    //     main.loadMoleculeStr(false, opt_cages[selected.unopt]);
    // });


});
