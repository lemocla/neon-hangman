/*jshint esversion: 6 */
/* globals $:false */
/* globals localStorage:false */

$(document).ready(function () {

    /*--------------------------[ VARIABLES ]-------------------------*/

    let level;
    const apiTrue = ['easy', 'medium', 'hard'];
    let isPlaying = false;
    //Words
    let hintCollection;
    let firstLetter = "";
    let word;
    let hint;
    let splitWord;
    let countCorrect = 0;
    let countIncorrect = 0;
    //Hangman
    let hangmanParts = [];
    $.each($('path'), function (value) {
        hangmanParts.push(value.id);
    });
    //scoring
    let countStreak = 0;
    let point = 10;
    let score = parseInt($('#score').text());
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
    let sound;

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

    function getLocalWord(level) {
        $.get("assets/words/words.txt", 'json').done(function (data) {
                let obj = JSON.parse(data);
                //https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
                generateLocalWord(obj, level);
            })
            .fail(function () {
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
                //Hint --> definition selected at random from the list of definitions for this word
                let definitions = dataType.results;
                //https://api.jquery.com/jquery.map/
                hintCollection = $.map(definitions, function (value) {
                    return value.definition;
                });
                console.log("word API = " + dataType.word);
            })
            .fail(function () {
                localWord();
            });
    }

    //Generate Random Word according to category selected

    function generateRandomWord(level) {
        getWordMethod = ((apiTrue.includes(level)) ? getWordApi(level) : getLocalWord(level));
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
        }, 1000);
    }

    function clearTimer() {
        clearInterval(x);
        $("#timer").text("0:00");
    }
    //record best score to leaderboard
    function GetSortOrder(prop) {
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
            leaderboard.sort(GetSortOrder("score"));
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
        }
    }

    //Start Game

    function startGame() {
        isPlaying = true;
        setGameElements();
        if ($('.keyboard-container').hasClass("hide")) {
            resetDisplayAfterWin();
        }
        if ($('.flex-container').hasClass("hide")) {
            addToLeaderboard();
            resetDisplayAfterGameOver();
        }
        timer = 120;
        setTimer(timer);
        level = $('.btn-level.active').text();
        countCorrect = 0;
        countIncorrect = 0;
        countStreak = 0;
        generateRandomWord(level);
    }

    $("button[data-function=start-game]").on("click", function () {
        startGame();
    });

    /*-------------------------[ PLAY GAME ]--------------------------*/

    //Display hints    

    function getHintValue() {
        hint = ((apiTrue.includes(level)) ?
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
        $('#part' +  nb).addClass('animate').removeClass('hide');
    }

    //Sounds

    //https://medium.com/@ericschwartz7/adding-audio-to-your-app-with-jquery-fa96b99dfa97
    function playSound(sound) {
        if ($('.btn-volume.active').attr('data-sound') == "on") {
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
            }
        });
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
        //Display hangman
        countIncorrect = ++countIncorrect;
        displayHangmanPart(countIncorrect);
        //Reset streak to 0
        countStreak = 0;
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
        countWords = ++countWords;
        $('.final-score').text(score);
        $('.count-words').text(countWords);
        //local storage
        localStorage.setItem("score", score);
        localStorage.setItem("countWords", countWords);
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
            $('.best-score-container').removeClass('hide');
            $('#best-score').text(score);
            localStorage.setItem('bestScore', score);
        }
        //Reset score to 0 when game over
        countWords = 0;
        score = 0;
        $('#score').text(score);
        //local storage
        localStorage.setItem("score", score);
        localStorage.setItem("countWords", countWords);
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
        } else {
            return;
        }
    });

    /*------------------------[ LEAVE GAME ]-----------------------*/

    function displayHomePage() {
        isPlaying = false;
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
            addToLeaderboard();
            resetDisplayAfterGameOver();
        }
    }

    $('.leave').on('click', function () {
        displayHomePage();
    });


});