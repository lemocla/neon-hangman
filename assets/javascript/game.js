$(document).ready(function () {

    /*-----------------[ Variables ]------------------*/
    let hintCollection;
    let firstLetter = "";

    /*-----------------[ Start Game ]------------------*/
    $('#start').on("click", function () {

        $('#start').addClass("hide");
        $('.word').removeClass("hide");
        $('#hint').removeClass("hide");
        generateRandomWord();
    });

    /*---------------[ Split Word & display in HTML ]----------------*/
    function displayWord(word) {
        splitWord = word.split("");
        firstLetter = splitWord[0];
        $.each(splitWord, function (index, value) {
            $(".word").append(
                `<div class="letter-box" id="${index}"></div>`
            )
        });
    }

    /*-----------------[ Random Word API ]------------------*/
    function generateRandomWord() {
        /*from RapidAPI documentation documentation - */
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=3&lettersMax=6&limit=5&page=1&frequencyMin=6",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "b1b8b66d72mshfbfc05708a9c0e5p10ad1bjsn0f9cbb550588",
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
            },
            //https://api.jquery.com/jquery.ajax/
            "dataType": "json",
        };

        $.ajax(settings).done(function (dataType) {
                displayWord(dataType.word);
                //Hint --> definition selected at random from the list of definitions for this word
                let definitions = dataType.results;
                //https://api.jquery.com/jquery.map/
                hintCollection = $.map(definitions, function (value, key) {
                    return value.definition;
                });
            })
            .fail(function (xhr) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                console.log('Error - ' + errorMessage);
                let word = "test";
                displayWord(word);
            });
    }
    /*-----------------[ Display hint ]------------------*/
    $('#hint').on('click', function () {
        let hint = ((hintCollection.length >= 1) ? hintCollection[Math.floor(Math.random() * hintCollection.length)] : `First letter in this word is: ${firstLetter}`);
        $('#hint-content').text(hint);
        $('#hint-content').toggleClass('hide');
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