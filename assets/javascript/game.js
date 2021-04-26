$(document).ready(function () {
    /*-----------------[bugs to fix / improvments]--------------------------*/
    /*
    - FIXED clear hint when game is won / game over
    - FIXED hide hint after 2 or 3 seconds 
    - start & continue ---> have a common attribute ?
    - add scoring / further info in menu about the game
    - clean hide & show different elements on start
    - FIXED see if game over can happen just after last part appeared --> added slight delay
    - see if there's a way to avoid the same word to be generated at random twice in a row
    - make sure nothing happens when key is pressed before game is started
    - ADDED - update the correct answer - word - in game over container
    - Move hint up on mobile as not to hide the word too much
    */

    /*-----------------[ Variables ]------------------*/
    let hintCollection;
    let firstLetter = "";
    let word;
    let hint;
    let splitWord;
    let countCorrect = 0;
    let countIncorrect = 0;
    let hangmanParts = [];
    $.each($('path'), function (key, value) {
        hangmanParts.push(value.id);
    });

    /*-----------------[ Start Game ]------------------*/
    $('#start').on("click", function () {
        startGame()
    });

    $('.continue').on("click", function () {
        startGame()
    });

    $('#play-again').on("click", function () {
        startGame();
    });

    function startGame() {
        $('.word').empty();
        $('#start').addClass("hide");
        $('.word').empty().removeClass("hide");
        $('#hint').removeClass("hide");
        $('.key').removeClass("disabled");
        if ($('.keyboard-container').hasClass("hide")) {
            $('.keyboard-container').removeClass("hide");
            $('#game-win').addClass("hide");
        }
        if ($('.flex-container').hasClass("hide")) {
            $('.flex-container').removeClass("hide");
            $('#game-over').addClass("hide");
        }
        /*hide hangman parts*/
        $.each($('path'), function (key, value) {
            $(this).addClass('hide');

        });
        let level = $('.btn-level.active').text();
        countCorrect = 0;
        countIncorrect = 0;
        generateRandomWord(level);
    }

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
                        hint: "I am a pet.",
                        level: "easy",
                        category: "animals"
                    },
                    {
                        word: "cow",
                        hint: "You can see me in fields, often in a cattle.",
                        level: "easy",
                        category: "animals"
                    },
                    {
                        word: "butterfly",
                        hint: "I flutter.",
                        level: "hard",
                        category: "animals"
                    },
                    {
                        word: "carterpillar",
                        hint: "My only job is to eat and I may produce silk.",
                        level: "hard",
                        category: "animals"
                    },
                    {
                        word: "donkey",
                        hint: "I am hard working.",
                        level: "medium",
                        category: "animals"
                    },
                    {
                        word: "eagle",
                        hint: "I am a bird of prey.",
                        level: "medium",
                        category: "animals"
                    },
                    {
                        word: "ham",
                        hint: "I am a type of meat.",
                        level: "easy",
                        category: "food"
                    },
                    {
                        word: "milk",
                        hint: "You can add me to hot drinks.",
                        level: "easy",
                        category: "food"
                    },
                    {
                        word: "avocado",
                        hint: "You find me in guacamole.",
                        level: "hard",
                        category: "food"
                    },
                    {
                        word: "chocolate",
                        hint: "I am  a favourite sweet treat.",
                        level: "hard",
                        category: "food"
                    },
                    {
                        word: "apple",
                        hint: "I am a juicy fruit.",
                        level: "medium",
                        category: "food"
                    },
                    {
                        word: "banana",
                        hint: "I am a very common fruit.",
                        level: "medium",
                        category: "food"
                    },
                    {
                        word: "bus",
                        hint: "I carry people around the city.",
                        level: "easy",
                        category: "transport"
                    },
                    {
                        word: "car",
                        hint: "Most popular form of transport.",
                        level: "easy",
                        category: "transport"
                    },
                    {
                        word: "bulldozer",
                        hint: "You can find me on building sites.",
                        level: "hard",
                        category: "transport"
                    },
                    {
                        word: "helicopter",
                        hint: "I fly across cities.",
                        level: "hard",
                        category: "transport"
                    },
                    {
                        word: "bicycle",
                        hint: "I have got two wheels.",
                        level: "medium",
                        category: "transport"
                    },
                    {
                        word: "tractor",
                        hint: "I work on the farm.",
                        level: "medium",
                        category: "transport"
                    }
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
                word = dataType.word;
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
        if (!$('#hint-content').hasClass('hide')) {
            setTimeout(function () {
                $('#hint-content').addClass('hide');
            }, 3000);
        }
    });

    /*------------------[ Display hangman part]------------*/
    function displayHangmanPart(nb) {
        $(`#part${nb}`).addClass('animate').removeClass('hide');
    }

    //-----------------[ PLAY GAME ] --------------------*/ 
    $(".key").on("click", function () {
        console.log($(this).text());
        console.log($(this).attr("id"));
        //
        let correctGuess = splitWord.includes($(this).text());
        let letter = $(this).text();
        console.log(correctGuess);
        //
        if (correctGuess) { //match
            console.log("correct guess");
            $.each(splitWord, function (index, value) {
                if (value === letter) {
                    console.log("letter is matched");
                    $("#" + index).append(letter);
                    countCorrect = ++countCorrect;
                    console.log(countCorrect);
                }
            });
            if (countCorrect == splitWord.length) {
                console.log("You won!");
                $('.keyboard-container').addClass("hide");
                $('#game-win').removeClass("hide");
                if (!$('#hint-content').hasClass('hide')) {
                    $('#hint-content').addClass('hide');
                }
                $('#hint').addClass("hide");

            }
        } else {
            console.log("Incorrect guess");
            //
            countIncorrect = ++countIncorrect;
            displayHangmanPart(countIncorrect);
            console.log(countIncorrect);
            /*
             if (countIncorrect == 10) {
            gameOver();
             }*/
            if (countIncorrect == 10) {
                setTimeout(function () {
                    gameOver();
                }, 575);
            }

        }
        $(this).addClass("disabled");
    });




    /* test show game over message */
    function gameOver() {
        $('.flex-container').addClass("hide");
        $('#game-over').removeClass("hide");
        $('#correct-answer').text(word);
        console.log("the right answer was: " + word);

    };

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