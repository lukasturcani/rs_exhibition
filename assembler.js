// The variables unopt_cages and opt_cages are defined in the file
// "cagesfile".

function activateNext(){
    $("#next_button1").on("click touchstart", function() {
        $("body").load("assembler2.html");
    });
    $("#next_button2").on("click touchstart", function() {
        $("body").load("assembler3.html");
    });
    $("#next_button3").on("click touchstart", function() {
        $("body").load("assembler4.html");
    });
}


$(document).ready(function() {

    // Render molecules and topologies.

    $("#next_button4").on("click touchstart", function() {
        $("body").load("assembler5.html");
    });
    $("#no_button").on("click touchstart", function() {
        selected.prediction = "no";
        $("body").load("assembler6.html");
    });
    $("#yes_button").on("click touchstart", function() {
        selected.prediction = "yes";
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
        $(this).toggleClass('selectedToggle');

    });
    $("#vdw_button").on("click touchstart", function() {
        $(this).toggleClass("selectedToggle");

    });


    $('.selectable').on("click touchstart", function() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        c = [for (x of this.classList) if (x=='bb' || x=='lk' || x=='top') x][0]
        selected[c] = this.id;

        $('.next_button').addClass('ready');
        activateNext();
    });


});
