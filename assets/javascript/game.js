$(document).ready(function () {

    /*-----------------[ Variables ]------------------*/
    let hintCollection;
    let firstLetter = "";
    let word;
    let hint;
    
    /*-----------------[ Start Game ]------------------*/
    $('#start').on("click", function () {
        $('.word').empty();
        $('#start').addClass("hide");
        $('.word').empty().removeClass("hide");
        $('#hint').removeClass("hide");

        let level = $('.btn-level.active').text();
        generateRandomWord(level);

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
    /* --------------[ Generate Random Word according to category selected ] ---------------*/

    function generateRandomWord(level) {
        const apiTrue = ['easy', 'medium', 'hard'];
        getWordMethod = ((apiTrue.includes(level)) ? wordApi(level) : localWord(level));
    };

    /*-------------------------------- [ Local words ] --------------------------------*/
    function generateLocalWord(obj, level) {
        let localWords = obj.filter(function (el) {
            return el.category == level;
        });
        let wordArray = localWords[Math.floor(Math.random() * localWords.length)];
        word = wordArray.word;
        hint = wordArray.hint;
        console.log("local word = " + word);
        console.log("local hint = " + hint);
        displayWord(word);
    }

    function localWord(level) {
        $.get("assets/words/words.txt", 'json').done(function (data) {
                console.log("local file working")
                var obj = JSON.parse(data);
                //https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
                generateLocalWord(obj, level);
            })
            .fail(function () {
                console.log('local file not working --> inline array');
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
                generateLocalWord(obj, level);
            });
    }
    /*-----------------[  API query parameters ]------------------*/
    function apiParameters(level) {
        let min;;
        let max;;
        let freqMin;
        let freqMax;
        if (level == 'easy') {
            min = 3;
            max = 5;
            freqMin = 5.5;
            freqMax = 12;
        } else if (level == 'medium') {
            min = 4;
            max = 7;
            freqMin = 4.3;
            freqMax = 7.5;
        } else {
            min = 4;
            // max letters set to 9 on mobile viewport
            max = (($(window).width() >= 576) ? 12 : 9);
            freqMin = 2;
            freqMax = 5;
        }
        return `lettersMin=${min}&lettersMax=${max}&limit=5&page=1&frequencyMin=${freqMin}&frequencyMax=${freqMax}`;
    }
    /*-----------------[ Random Word API ]------------------*/
    function wordApi(level) {
        //lettersMin=3&lettersMax=6&limit=5&page=1&frequencyMin=6
        /*from RapidAPI documentation documentation*/
        let parameters = apiParameters(level);
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://wordsapiv1.p.rapidapi.com/words/?random=true&${parameters}`,
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
                hint = ((hintCollection.length >= 1) ? hintCollection[Math.floor(Math.random() * hintCollection.length)] : `First letter in this word is: ${firstLetter}`);
                console.log("word API = " + dataType.word);
                console.log("hinT API = " + hint);
            })
            .fail(function (xhr) {
                localWord();
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