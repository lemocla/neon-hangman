/*jshint esversion: 6 */
/* globals $:false */
/* globals localStorage:false */

$(document).ready(function () {

    /*--------------------------[ VARIABLES ]-------------------------*/

    let level;
    let category;
    const apiTrue = "dictionary";
    let isPlaying = false;
    //Words
    let hintCollection;
    let firstLetter = "";
    let word;
    let hint;
    let splitWord;
    let countCorrect = 0;
    let countIncorrect = 0;
    let maxCharacterCount;
    if ($(".word").width() <= 335) {
        maxCharacterCount = 8;
    } else if ($(".word").width() <= 425) {
        maxCharacterCount = 9;
        console.log("max = " + maxCharacterCount);
    } else if ($(".word").width() <= 490) {
        maxCharacterCount = 10;
        console.log("max = " + maxCharacterCount);
    } else if ($(".word").width() <= 510) {
        maxCharacterCount = 11;
        console.log("max = " + maxCharacterCount);
    } else {
        maxCharacterCount = 12;
        console.log("max = " + maxCharacterCount);
    }
    //Hangman
    let hangmanParts = [];
    $.each($('path'), function (value) {
        hangmanParts.push(value.id);
    });
    //scoring
    let countStreak = 0;
    let point = 10;
    let score = parseInt($('#score').text());
    let isBestScore = false;
    //Word Count
    let countWords;
    if (localStorage.countWords) {
        countWords = parseInt(localStorage.getItem("countWords"));
    } else {
        localStorage.setItem("countWords", 0);
        countWords = 0;
    }
    //timer
    let timer;
    let x;
    //sound
    let sound;
    //Web storage
    let matchStorage = [];
    let hangmanStorage = [];
    let keyPressed = [];

    /*-----------------------[ LOCAL STORAGE ]---------------------*/

    if (localStorage.isPlaying) {
        isPlaying = (localStorage.getItem("isPlaying"));
        console.log(isPlaying);
        if (isPlaying === "true") {

            $('#start').addClass("hide");
            $('.word').empty().removeClass("hide");
            $('#hint').removeClass("hide");
            $('.key').removeClass("disabled");
            //
            category = localStorage.getItem("isPlayingCategory");
            // fetch and update score
            score = parseInt(localStorage.getItem("score"));
            $('#score').text(parseInt(localStorage.getItem("score")));
            console.log("score=" + score);
            //set timer 
            setTimer(parseInt(localStorage.getItem("timer")));
            //fetch words and display in html
            word = localStorage.getItem("word");
            splitWord = word.split("");
            hint = localStorage.getItem("hint");
            
            //
            if (localStorage.hintCollection){
                hintCollection = JSON.parse(localStorage.getItem("hintCollection"));
            }
            else{
                hintCollection = [];
            }
            //
            console.log("stored hint col = " + hintCollection);
            displayWord(word);
            countStreak = parseInt(localStorage.getItem("countStreak"));
            if (localStorage.matchStorage) {
                matchStorage = JSON.parse(localStorage.getItem("matchStorage"));
            } else {
                matchStorage = [];
            }
            countCorrect = matchStorage.length;
            console.log("countCorrect");
            console.log("match" + matchStorage);
            if (matchStorage.length > 0) {
                $.each(splitWord, function (index, value) {

                    if (jQuery.inArray(value, matchStorage) != -1) {
                        console.log(value);
                        $("#" + index).append(value);
                    }
                });
            }
            //key pressed
            if (localStorage.keyStorage) {
                console.log("key pressed exists");
                keyPressed = JSON.parse(localStorage.getItem("keyStorage"));
                console.log("key pressed " + keyPressed);
                if (keyPressed.length > 0) {
                    $.each(keyPressed, function (index, value) {
                        console.log("value keypressed array =" + value);
                        $(`.key[id="${value}"]`).addClass("disabled");
                    });
                }
            } else {
                console.log("Storage doesn't exist");
                keyPressed = [];
            }
            //Hangman storage
            countIncorrect = parseInt(localStorage.getItem("countIncorrect"));
            $.each($('path'), function (index) {
                if (index > (countIncorrect - 1))
                    $(this).addClass('hide');
            });

        }
    } else {
        localStorage.setItem("isPlaying", false);
    }

    /*------------------------[ START GAME ]-----------------------*/

    //Split and display word in html

    function displayWord(word) {
        splitWord = word.split("");
        firstLetter = splitWord[0];
        $.each(splitWord, function (index) {
            $(".word").append(
                `<div class="letter-box b-neon-blue" id="${index}"></div>`
            );
        });
    }

    //Local words 

    function generateLocalWord(obj, level, category) {
        let localWords = obj.filter(function (el) {
            return el.category == category && el.level == level && el.count <= maxCharacterCount;
        });
        let wordArray = localWords[Math.floor(Math.random() * localWords.length)];
        word = wordArray.word;
        hint = wordArray.hint;
        console.log("local word = " + word);
        console.log("local hint = " + hint);
        localStorage.setItem("word", word);
        localStorage.setItem("hint", hint);
        displayWord(word);
    }

    function getLocalWord(level, category) {
        $.get("assets/words/wordslist.json", 'json').done(function (data) {
                //https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
                generateLocalWord(data, level, category);
            })
            .fail(function () {
                let obj = [{
                        word: "dog",
                        hint: "I am a pet.",
                        level: "easy",
                        category: "animals",
                        count: "3"
                    },
                    {
                        word: "duck",
                        hint: "I can be seen in a fam or on a pond.",
                        level: "easy",
                        category: "animals",
                        count: "4"
                    },
                    {
                        word: "meerkats",
                        hint: "I am mainly found in Southern Africa and on TV.",
                        level: "hard",
                        category: "animals",
                        count: "8"
                    },
                    {
                        word: "penguin",
                        hint: "I am a cute black and white animal.",
                        level: "hard",
                        category: "animals",
                        count: "7"
                    },
                    {
                        word: "giraffe",
                        hint: "I live in Africa but I am often seen in a zoo.",
                        level: "medium",
                        category: "animals",
                        count: "7"
                    },
                    {
                        word: "hamster",
                        hint: "I am a small pet.",
                        level: "medium",
                        category: "animals",
                        count: "7"
                    },
                    {
                        word: "ham",
                        hint: "I am a type of meat.",
                        level: "easy",
                        category: "food",
                        count: "3"
                    },
                    {
                        word: "milk",
                        hint: "You can add me to hot drinks.",
                        level: "easy",
                        category: "food",
                        count: "4"
                    },
                    {
                        word: "porridge",
                        hint: "Goldilocks favourite breakfast.",
                        level: "hard",
                        category: "food",
                        count: "8"
                    },
                    {
                        word: "quiche",
                        hint: "I am kind of tart for lunch.",
                        level: "hard",
                        category: "food",
                        count: "6"
                    },
                    {
                        word: "apple",
                        hint: "I am a juicy fruit.",
                        level: "medium",
                        category: "food",
                        count: "5"
                    },
                    {
                        word: "banana",
                        hint: "I am a very common fruit.",
                        level: "medium",
                        category: "food",
                        count: "6"
                    },
                    {
                        word: "boat",
                        hint: "I float on water.",
                        level: "easy",
                        category: "transport",
                        count: "4"
                    },
                    {
                        word: "car",
                        hint: "Most popular form of transport.",
                        level: "easy",
                        category: "transport",
                        count: "3"
                    },
                    {
                        word: "forklift",
                        hint: "I am a loading vehicle.",
                        level: "hard",
                        category: "transport",
                        count: "8"
                    },
                    {
                        word: "frigate",
                        hint: "I am a type of warship. ",
                        level: "hard",
                        category: "transport",
                        count: "7"
                    },
                    {
                        word: "tanker",
                        hint: "I transport liquids.",
                        level: "medium",
                        category: "transport",
                        count: "6"
                    },
                    {
                        word: "tractor",
                        hint: "I work on the farm.",
                        level: "medium",
                        category: "transport",
                        count: "7"
                    }
                ];
                generateLocalWord(obj, level, category);
            });
    }

    //set API parameters

    function setApiParameters(level) {
        let min;
        let max;
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

    //Get random Word via API

    function getWordApi(level) {
        /*from RapidAPI documentation documentation*/
        let parameters = setApiParameters(level);
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
            "dataType": "json"
        };

        $.ajax(settings).done(function (dataType) {
                displayWord(dataType.word);
                word = dataType.word;
                localStorage.setItem("word", dataType.word);
                //Hint --> definition selected at random from the list of definitions for this word
                let definitions = dataType.results;
                //https://api.jquery.com/jquery.map/
                hintCollection = $.map(definitions, function (value) {
                    return value.definition;
                });
                localStorage.setItem("hintCollection",  JSON.stringify(hintCollection));
                console.log("word API = " + dataType.word);
                console.log("hint collection = " + hintCollection);
            })
            .fail(function () {
                localWord();
            });
    }

    //Generate Random Word according to category selected

    function generateRandomWord(category, level) {
        if (category === "dictionary") {
            getWordApi(level);
        } else {
            getLocalWord(level, category);
        }
    }

    //Timer

    //https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
    function pad(n) {
        let sec = ((n < 10) ? '0' + n : n);
        return sec;
    }

    //https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
    function setTimer(timer) {
        x = setInterval(function () {
            if (timer <= 0) {
                clearInterval(x);
                $("#timer").text("0:00");
                gameOver();
            } else {
                let minutes = Math.floor((timer % (60 * 60)) / (60));
                let seconds = Math.floor(timer % 60);

                seconds = pad(seconds);
                $("#timer").text(minutes + ":" + seconds);
            }
            timer -= 1;
            localStorage.setItem("timer", timer);
        }, 1000);
    }

    function clearTimer() {
        clearInterval(x);
        $("#timer").text("0:00");
    }


    //display and hide html contents

    function setGameElements() {
        $('.word').empty();
        $('#start').addClass("hide");
        $('.word').empty().removeClass("hide");
        $('#hint').removeClass("hide");
        $('.key').removeClass("disabled");
        //Hide hangman parts
        $.each($('path'), function () {
            $(this).addClass('hide');
        });
    }

    function resetDisplayAfterWin() {
        $('.keyboard-container').removeClass("hide");
        $('#game-win').addClass("hide");
    }

    function resetDisplayAfterGameOver() {
        $('.flex-container').removeClass("hide");
        $('#game-over').addClass("hide");
        //Hide best score container
        if (!$('.best-score-container').hasClass('hide')) {
            $('.best-score-container').addClass('hide');
            if ($("#scorename-container").hasClass("hide")) {
                $("#scorename-container").removeClass("hide");
                $("#save-notification").addClass("hide");
            }
        }
    }

    //Start Game

    function startGame() {
        isPlaying = true;
        localStorage.setItem("isPlaying", isPlaying);
        
        setGameElements();
        if ($('.keyboard-container').hasClass("hide")) {
            resetDisplayAfterWin();
        }
        if ($('.flex-container').hasClass("hide")) {
            resetDisplayAfterGameOver();
        }
        timer = 120;
        setTimer(timer);
        level = $('.btn-level.active').text();
        category = $('.btn-category.active').text();
        localStorage.setItem("isPlayingCategory", category);
        countCorrect = 0;
        countIncorrect = 0;
        countStreak = 0;
        isBestScore = false;
        generateRandomWord(category, level);
        //
        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));
        localStorage.setItem("keyStorage", JSON.stringify(keyPressed));
        localStorage.setItem("countIncorrect", countIncorrect);
        localStorage.setItem("countCorrect", countCorrect);
    }

    $("button[data-function=start-game]").on("click", function () {
        startGame();
    });

    /*-------------------------[ PLAY GAME ]--------------------------*/

    //Display hints    

    function getHintValue() {
    console.log("hint collection in fction get Hint val = " + hintCollection);
    console.log("category = " + category);
        hint = ((category == "dictionary") ?
            ((hintCollection.length >= 1) ? hintCollection[Math.floor(Math.random() * hintCollection.length)] : `First letter in this word is: ${firstLetter}`) :
            hint);
    }

    $('#hint').on('click', function () {
        getHintValue();
        $('#hint-content').text(hint);
        $('#hint-content').toggleClass('hide');
        if (!$('#hint-content').hasClass('hide')) {
            setTimeout(function () {
                $('#hint-content').addClass('hide');
            }, 3500);
        }
    });

    //Display hangman parts

    function displayHangmanPart(nb) {
        $('#part' + nb).addClass('animate').removeClass('hide');
    }

    //Sounds

    //https://medium.com/@ericschwartz7/adding-audio-to-your-app-with-jquery-fa96b99dfa97
    function playSound(sound) {
        if ($('.btn-volume.active').attr('data-sound') == "on") {
            $(sound)[0].currentTime = 0;
            $(sound)[0].play();
        }
    }

    //Scoring

    function incrementScore(countStreak, score, point) {
        let addPoints = countStreak * point;
        score = score + addPoints;
        $('#score').text(score);
        return score;
    }

    //Match

    function match(letter) {
        sound = "audio#success-sound";
        //local storage

        //let matchStorage =  JSON.parse(localStorage.getItem("matchStorage"));
        $.each(splitWord, function (index, value) {
            if (value === letter) {
                //Sound
                playSound(sound);
                //Update letter
                $("#" + index).append(letter);
                countCorrect = ++countCorrect;
                //scoring
                countStreak = ++countStreak;
                score = incrementScore(countStreak, score, point);
                //Local storage
                matchStorage.push(value);
                localStorage.setItem("countStreak", countStreak);
                localStorage.setItem("score", score);
            }
        });

        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));
        if (countCorrect == splitWord.length) {
            setTimeout(function () {
                gameWin();
            }, 575);
        }
    }

    //No match

    function noMatch() {
        //Sound
        sound = "audio#fail-sound";
        playSound(sound);
        let hangmanStorage = [];
        //Display hangman
        countIncorrect = ++countIncorrect;
        displayHangmanPart(countIncorrect);
        //Reset streak to 0
        countStreak = 0;
        //Local storage
        hangmanStorage.push(countIncorrect);
        localStorage.setItem("countStreak", countStreak);
        localStorage.setItem("countIncorrect", countIncorrect);
        localStorage.setItem("hangmanStorage", hangmanStorage);
        //Call game over function
        if (countIncorrect == 10) {
            setTimeout(function () {
                gameOver();
            }, 575);
        }
    }

    //Game win

    function gameWin() {
        //Sounds
        sound = "audio#win-sound";
        playSound(sound);
        //Clear timer interval
        clearTimer();
        //Display win message
        $('.keyboard-container').addClass("hide");
        $('#game-win').removeClass("hide");
        //Hide hint if displayed
        if (!$('#hint-content').hasClass('hide')) {
            $('#hint-content').addClass('hide');
        }
        $('#hint').addClass("hide");
        //Update statistics
        isPlaying = false;
        countWords = ++countWords;
        $('.final-score').text(score);
        $('.count-words').text(countWords);
        //local storage
        localStorage.setItem("score", score);
        localStorage.setItem("timer", 0);
        localStorage.setItem("countWords", countWords);
        localStorage.getItem("countIncorrect", 0);
        localStorage.setItem("isPlaying", isPlaying);
        localStorage.setItem("isPlayingCategory", "");
        localStorage.setItem("word", "");
        localStorage.setItem("hint", "");
        localStorage.setItem("countStreak", 0);
        matchStorage.length = 0;
        keyPressed.length = 0;
        hintCollection.length = 0;
        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));
        localStorage.setItem("keyStorage", JSON.stringify(keyPressed));
        localStorage.setItem("hintCollection",  JSON.stringify(hintCollection));
    }


    //Game over
    function gameOver() {
        //Sounds
        sound = "audio#game-over-sound";
        playSound(sound);
        //Clear timer interval
        clearTimer();
        //Update game over message with stats
        $('#correct-answer').text(word);
        $('.final-score').text(score);
        $('.count-words').text(countWords);
        //display game over
        $('.flex-container').addClass("hide");
        $('#game-over').removeClass("hide");
        //Update best score with scoring info
        if (parseInt($('#best-score').text()) < score) {
            isBestScore = true;
            $('.best-score-container').removeClass('hide');
            $('#best-score').text(score);
            localStorage.setItem('bestScore', score);
        }
        //Reset score to 0 when game over
        countWords = 0;
        score = 0;
        isPlaying = false;
        $('#score').text(score);
        //local storage
        localStorage.setItem("score", score);
        localStorage.setItem("timer", 0);
        localStorage.setItem("isPlaying", isPlaying);
        localStorage.setItem("isPlayingCategory", "");
        localStorage.setItem("countWords", countWords);
        localStorage.setItem("countIncorrect", 0);
        localStorage.setItem("countStreak", 0);
        localStorage.setItem("word", "");
        localStorage.setItem("hint", "");
        matchStorage.length = 0;
        keyPressed.length = 0;
        hintCollection.length = 0;
        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));
        localStorage.setItem("keyStorage", JSON.stringify(keyPressed));
        localStorage.setItem("hintCollection",  JSON.stringify(hintCollection));
    }

    //Play game

    $(".key").on("click", function () {
        if (isPlaying) {
            //Evaluate guess
            let isCorrectGuess = splitWord.includes($(this).text());
            let letter = $(this).text();
            //Match / noMatch
            functionToRun = (isCorrectGuess) ? match(letter) : noMatch();
            //Disable keys
            $(this).addClass("disabled");
            //Local storage
            keyPressed.push(letter);
            console.log("when press key " + keyPressed);
            localStorage.setItem("keyStorage", JSON.stringify(keyPressed));
        } else {
            return;
        }
    });

    /*------------------------[ LEAVE GAME ]-----------------------*/

    function displayHomePage() {

        $('.word').empty().addClass('hide');
        $('#start').removeClass("hide");
        $('#hint').addClass("hide");
        $('.key').removeClass("disabled");
        $.each($('path'), function () {
            $(this).removeClass('hide');
        });
        if (parseInt($('#score').text()) == 0) {
            $('#start').text('play');
        } else {
            $('#start').text('continue');
        }
        if ($('.keyboard-container').hasClass("hide")) {
            resetDisplayAfterWin();
        }
        if ($('.flex-container').hasClass("hide")) {
            resetDisplayAfterGameOver();
        }
    }

    $('.leave').on('click', function () {
        displayHomePage();
    });

    /*-------------------[ RECORD BEST SCORE TO LEADERBOARD ]-------------------*/

    function sortOrder(prop) {
        return function (a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        };
    }

    function addToLeaderboard() {
        let playerName = $('#scorename').val();
        let today = new Date();
        today = today.toLocaleDateString();
        let leaderboard = JSON.parse(localStorage.getItem("arrayBestScores"));
        let recScore = localStorage.getItem("bestScore");
        let addPlayerDetails = {
            "date": `${today}`,
            "name": `${playerName}`,
            "score": `${recScore}`
        };

        if (leaderboard.length >= 1) {
            leaderboard.push(addPlayerDetails);
            leaderboard.sort(sortOrder("score"));
            $('#lead-table').append(`<tr><td>${today}</td><td>${playerName}</td><td>${recScore}</td></tr>`);
            //sort
            $(`tr:contains(${recScore})`).insertAfter('#head-row');
        } else {
            leaderboard.push(addPlayerDetails);
            $('#leaderboard').html(`
             <table id="lead-table">
             <tr id="head-row"><th>date</th><th>name</th><th>score</th></tr>
             <tr><td>${today}</td><td>${playerName}</td><td>${recScore}</td></tr>
             </table>
             `);
        }

        localStorage.setItem("arrayBestScores", JSON.stringify(leaderboard));
        $("#scorename").val("");
    }

    var delay = (function () {
        var timerDelay = 0;
        return function (callback, ms) {
            clearTimeout(timerDelay);
            timerDelay = setTimeout(callback, ms);
        };
    })();

    $('#scorename').keyup(function () {
        console.log("The function are ready to run on input");
        delay(function () {
            console.log("delay function is working");
            addToLeaderboard();
            $("#scorename-container").addClass("hide");
            $("#save-notification").removeClass("hide");
        }, 1250);
    });

});