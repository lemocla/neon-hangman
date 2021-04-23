$(document).ready(function () {

    // Start the game
    $('#start').on("click", function () {

        $('#start').addClass("hide");
        $('.word').removeClass("hide");
        $('#hint').removeClass("hide");
    });

    //Split word into an array
    let word = "test";
    splitWord = word.split("");
    //Display word
    $.each(splitWord, function (index, value) {
        $(".word").append(
            `<div class="letter-box" id="${index}"></div>`
        )
    });

    /* test show game win message */
    $('#test-win').on("click", function () {
        $('.keyboard-container').addClass("hide");
        $('#game-win').removeClass("hide");
        $('#hint').addClass("hide");
    });

    /* test show game over message */
    $('#test-over').on("click", function () {
        $('.flex-container').addClass("hide");
        $('#game-over').removeClass("hide");

    });

    /* test back to start */
    $('#backtostart').on("click", function () {
        $('.keyboard-container').removeClass("hide");
        $('#game-win').addClass("hide");

        $('.flex-container').removeClass("hide");
        $('#game-over').addClass("hide");

        $('#start').removeClass("hide");
        $('.word').addClass("hide");
        $('#hint').addClass("hide");
    });
})