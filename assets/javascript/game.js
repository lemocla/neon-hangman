$(document).ready(function () {

    /*-----------------[ Variables ]------------------*/
    let hintCollection;
    let firstLetter = "";
    let word;
    let hint;
    let localWords;
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
    /*-------------------------------- [ Local words ] --------------------------------*/

    function generateLocalWord() {
        $.get("assets/words/words.txt*", 'json').done(function (data) {
                console.log("working")
                var obj = JSON.parse(data);
                //https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
                localWords = obj.filter(function (el) {
                    return el.level == 'easy';
                });
                console.log(localWords);
                let wordArray = localWords[Math.floor(Math.random() * localWords.length)];
                console.log(wordArray);
                word = wordArray.word;
                hint = wordArray.hint;
                console.log("local word = " + word);
                console.log("local hint = " + hint);
                displayWord(word);
            })
            .fail(function () {
                console.log('Error not working');
                let obj = [{
                        word: "cat",
                        hint: "A furry friend",
                        level: "easy",
                        category: "animals"
                    },
                    {
                        word: "dog",
                        hint: "A faithful friend, pet",
                        level: "easy",
                        category: "animals"
                    },
                    {
                        word: "pig",
                        hint: "Lives in a farm",
                        level: "easy",
                        category: "animals"
                    },
                    {
                        word: "giraffe",
                        hint: "Lives in Africa",
                        level: "medium",
                        category: "animals"
                    },
                ];
                localWords = obj.filter(function (el) {
                    return el.level == 'easy';
                });
                let wordArray = localWords[Math.floor(Math.random() * localWords.length)];
                word = wordArray.word;
                hint = wordArray.hint;
                console.log(typeof obj);
                console.log(localWords)
                console.log(wordArray);
                console.log("local word = " + word);
                console.log("local hint = " + hint);
                displayWord(word);
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
                "x-rapidapi-key": "b1b8b66d72mshfbfc05708a9c0e5p10ad1bjsn0f9cbb550588*",
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
            },
            //https://api.jquery.com/jquery.ajax/
            "dataType": "json",
        };

     $.ajax(settings).done(function (dataType) {
                displayWord(dataType.word);
                word = dataType.word;
                console.log(word);
                //Hint --> definition selected at random from the list of definitions for this word
                let definitions = dataType.results;
                //https://api.jquery.com/jquery.map/
                hintCollection = $.map(definitions, function (value, key) {
                    return value.definition;
                });
                hint = ((hintCollection.length >= 1) ? hintCollection[Math.floor(Math.random() * hintCollection.length)] : `First letter in this word is: ${firstLetter}`);
            })
            .fail(function (xhr) {
                generateLocalWord();

            });
    }

    /*-----------------[ Display hint ]------------------*/
    $('#hint').on('click', function () {
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