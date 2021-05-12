/*jshint esversion: 6 */
/* globals $:false */
/* globals localStorage:false */

$(document).ready(function () {

    // Variables

    let level;
    let category;
    let isPlaying = "false";
    //Words
    let word;
    let max;
    let splitWord;
    // Hints
    let hintCollection = [];
    let firstLetter = "";
    let hint;
    let tHint; //time out hint
    // Game scenario 
    let countCorrect = 0;
    let countIncorrect = 0;
    // Hangman
    let hangmanParts = [];
    $.each($("path"), function (value) {
        hangmanParts.push(value.id);
    });
    // Scoring
    let countStreak = 0;
    let point = 10;
    let score = parseInt($("#score").text());
    // Word Count
    let countWords;
    if (localStorage.countWords) {
        countWords = parseInt(localStorage.getItem("countWords"));
    } else {
        localStorage.setItem("countWords", 0);
        countWords = 0;
    }
    // Timer
    let timer;
    let x;
    // Sound
    let sound;
    // Local storage
    let matchStorage = [];
    let keyPressed = [];

    /*  Local storage game in progress 
     * Identify if a game is in progress 
     * Update all game elements if a game is in progress so that player can carry on where he left off
     */

    if (localStorage.isPlaying) {
        isPlaying = (localStorage.getItem("isPlaying"));
        if (isPlaying === "true") {
            setGameElements();
            // Fetch and update category
            category = localStorage.getItem("isPlayingCategory");
            // Fetch and update timer
            setTimer(parseInt(localStorage.getItem("timer")));
            // Fetch words and display in html
            word = localStorage.getItem("word");
            splitWord = word.split("");
            displayWord(word);
            // Fetch and update hint
            hint = localStorage.getItem("hint");
            hintCollection = JSON.parse(localStorage.getItem("hintCollection"));
            // Fetch count streak
            countStreak = parseInt(localStorage.getItem("countStreak"));
            // Fetch & update correctly guessed letters
            matchStorage = JSON.parse(localStorage.getItem("matchStorage"));
            countCorrect = matchStorage.length;
            if (matchStorage.length > 0) {
                $.each(splitWord, function (index, value) {
                    if ($.inArray(value, matchStorage) != -1) {
                        $("#" + index).append(value);
                    }
                });
            }
            // Update key pressed
            keyPressed = JSON.parse(localStorage.getItem("keyStorage"));
            if (keyPressed.length > 0) {
                $.each(keyPressed, function (index, value) {
                    $(`.key[id="${value}"]`).addClass("disabled");
                });
            }
            // Update hangman & count incorrect
            countIncorrect = parseInt(localStorage.getItem("countIncorrect"));
            $.each($("path"), function (index) {
                if (index > (countIncorrect - 1))
                    $(this).addClass("hide");
            });
        }
    } else {
        localStorage.setItem("isPlaying", "false");
    }

    // Start game

    // Function setting the maximum character count according to word container width 
    function setMaxCharacterCount() {
        if ($(".word").width() <= 335) {
            return 8;
        } else if ($(".word").width() <= 425) {
            return 9;
        } else if ($(".word").width() <= 490) {
            return 10;
        } else if ($(".word").width() <= 510) {
            return 11;
        } else {
            return 12;
        }
    }

    // Function splitting and displaying word in html
    function displayWord(word) {
        splitWord = word.split("");
        firstLetter = splitWord[0];
        $.each(splitWord, function (index) {
            $(".word").append(
                `<div class="letter-box b-neon-blue" id="${index}"></div>`
            );
        });
    }

    // Function to generate a random word from local array  
    function generateLocalWord(obj, level, category) {
        // Build an array of words according to category, level and max characters
        let localWords = obj.filter(function (el) {
            max = setMaxCharacterCount();
            if (category === "dictionary") { // if API call fails
                return el.level == level && el.count <= max;
            } else {
                return el.category == category && el.level == level && el.count <= max;
            }
        });
        // Select a random word from localWords array
        let wordArray = localWords[Math.floor(Math.random() * localWords.length)];
        word = wordArray.word;
        hint = wordArray.hint;
        // Add hint to hint collection in case API fails
        if (category === "dictionary") {
            hintCollection.push(hint);
            localStorage.setItem("hintCollection", JSON.stringify(hintCollection));
        }
        // Set local storage
        localStorage.setItem("word", word);
        localStorage.setItem("hint", hint);
        displayWord(word);
    }

    // Function calling the local array 
    function getLocalWord(level, category) {
        $.get("assets/words/wordslist.json", "json").done(function (data) {
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

    //set API parameters according to selected level
    function setApiParameters(level) {
        let min;
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
            max = setMaxCharacterCount();
            freqMin = 2;
            freqMax = 5;
        }
        return `lettersMin=${min}&lettersMax=${max}&limit=5&page=1&frequencyMin=${freqMin}&frequencyMax=${freqMax}`;
    }

    // Function calling wordsAPI 
    function getWordApi(level) {
        /*from RapidAPI documentation documentation*/
        let parameters = setApiParameters(level);
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://wordsapiv1.p.rapidapi.com/words/?random=true&hasDetails=definitions&${parameters}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "b1b8b66d72mshfbfc05708a9c0e5p10ad1bjsn0f9cbb550588",
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
            },
            "dataType": "json"
        };

        $.ajax(settings).done(function (dataType) {
                displayWord(dataType.word);
                word = dataType.word;
                // Hint --> definition selected at random from the list of definitions for this word
                let definitions = dataType.results;
                // https://api.jquery.com/jquery.map/
                hintCollection = $.map(definitions, function (value) {
                    return value.definition;
                });
                // Local storage
                localStorage.setItem("word", dataType.word);
                localStorage.setItem("hintCollection", JSON.stringify(hintCollection));
            })
            .fail(function () {
                getLocalWord(level, category);
            });
    }

    // Function defining method to create random Word according to selected level & category 
    function generateRandomWord(category, level) {
        if (category === "dictionary") {
            getWordApi(level);
        } else {
            getLocalWord(level, category);
        }
    }

    // Timer

    // Function to turn seconds in double digit when less than 10
    // https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
    function pad(n) {
        let sec = ((n < 10) ? '0' + n : n);
        return sec;
    }

    // https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
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
            // Local storage
            localStorage.setItem("timer", timer);
        }, 1000);
    }

    function clearTimer() {
        clearInterval(x);
        $("#timer").text("0:00");
    }

    // Function to display and hide html contents
    function setGameElements() {
        $("#start").addClass("hide");
        $(".word").empty().removeClass("hide");
        $("#hint").removeClass("hide");
        $(".key").removeClass("disabled");
    }

    // Function to hide all hangman parts
    function hideHangmanParts() {
        $.each($("path"), function () {
            $(this).addClass("hide");
        });
    }

    // Function reset display after game is won
    function resetDisplayAfterWin() {
        $(".keyboard-container").removeClass("hide");
        $("#game-win").addClass("hide");
    }

    // Function reset display after game is over
    function resetDisplayAfterGameOver() {
        $(".flex-container").removeClass("hide");
        $("#game-over").addClass("hide");
        //Hide best score container
        if (!$(".best-score-container").hasClass("hide")) {
            $(".best-score-container").addClass("hide");
            if ($("#scorename-container").hasClass("hide")) {
                $("#scorename-container").removeClass("hide");
                $("#save-notification").addClass("hide");
            }
        }
    }

    // Function to set local storage with in-game information
    function setLocalStorage() {
        isPlaying = "true";
        localStorage.setItem("isPlaying", isPlaying);
        localStorage.setItem("isPlayingCategory", category);
        localStorage.setItem("hintCollection", JSON.stringify(hintCollection));
        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));
        localStorage.setItem("keyStorage", JSON.stringify(keyPressed));
        localStorage.setItem("countIncorrect", countIncorrect);
        localStorage.setItem("countCorrect", countCorrect);
        localStorage.setItem("countStreak", countStreak);
    }

    // Function to be executed when start is clicked
    function startGame() {
        // Update display elements
        setGameElements();
        hideHangmanParts();
        // Reset after game is won
        if ($(".keyboard-container").hasClass("hide")) {
            resetDisplayAfterWin();
        }
        // Reset after game is over
        if ($(".flex-container").hasClass("hide")) {
            resetDisplayAfterGameOver();
        }
        // Set timer
        timer = 120;
        setTimer(timer);
        // Update variables
        level = $(".btn-level.active").text();
        category = $(".btn-category.active").text();
        countCorrect = 0;
        countIncorrect = 0;
        countStreak = 0;
        // Create random word
        generateRandomWord(category, level);
        //Local storage
        setLocalStorage();
    }

    $("button[data-function=start-game]").on("click", function () {
        startGame();
    });

    // Play game

    // Hints

    /* Function to get hint value according to selected category  
     * hint from word generated via local API to be selected at random from a collection of definition for that word.
     * if no definition are available, the hint will be the first letter in the word. 
     */

    function getHintValue() {
        hint = ((category == "dictionary") ?
            ((hintCollection.length >= 1) ? hintCollection[Math.floor(Math.random() * hintCollection.length)] : `First letter in this word is: ${firstLetter}`) :
            hint);
    }

    // Function to display hint for 3.75 seconds
    function displayHint() {
        tHint = setTimeout(function () {
            $("#hint-content").addClass("hide");
        }, 3750);
    }

    // Function to clear timeout in displayHint
    function clearTimeOutHint() {
        clearTimeout(tHint);
    }

    $('#hint').on('click', function () {
        clearTimeOutHint();
        getHintValue();
        $("#hint-content").text(hint);
        $("#hint-content").toggleClass("hide");
        if (!$("#hint-content").hasClass("hide")) {
            displayHint();
        }
    });

    //Display hangman parts
    function displayHangmanPart(nb) {
        $("#part" + nb).addClass("animate").removeClass("hide");
    }

    //Sounds
    //https://medium.com/@ericschwartz7/adding-audio-to-your-app-with-jquery-fa96b99dfa97
    function playSound(sound) {
        if ($(".btn-volume.active").attr("data-sound") == "on") {
            $(sound)[0].currentTime = 0;
            $(sound)[0].muted = false;
            $(sound)[0].autoplay = false;
            let promise = $(sound)[0].play();
            //Handle error - uncaught in promise DOMException: play()
            //https://stackoverflow.com/questions/54719283/google-chrome-uncaught-in-promise-domexception-while-playing-audio
            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                }).catch(error => {
                    // Autoplay was prevented. 
                });
            }
        }
    }

    //Scoring
    function incrementScore(countStreak, score, point) {
        let addPoints = countStreak * point;
        score = score + addPoints;
        $("#score").text(score);
        return score;
    }

    //Match
    function match(letter) {
        sound = "audio#success-sound";
        $.each(splitWord, function (index, value) {
            if (value === letter) {
                // Sound
                playSound(sound);
                // Update letter
                $("#" + index).append(letter);
                countCorrect = ++countCorrect;
                // scoring
                countStreak = ++countStreak;
                score = incrementScore(countStreak, score, point);
                // Local storage
                matchStorage.push(value);
                localStorage.setItem("countStreak", countStreak);
                localStorage.setItem("score", score);
            }
        });
        // Local storage
        localStorage.setItem("matchStorage", JSON.stringify(matchStorage));
        // Check if game win and call gameWin function if count correct = total word length
        if (countCorrect == splitWord.length) {
            setTimeout(function () {
                gameWin();
            }, 575);
        }
    }

    // No match
    function noMatch() {
        // Sound
        sound = "audio#fail-sound";
        playSound(sound);
        let hangmanStorage = [];
        // Display hangman
        countIncorrect = ++countIncorrect;
        displayHangmanPart(countIncorrect);
        // Reset streak to 0
        countStreak = 0;
        // Local storage
        hangmanStorage.push(countIncorrect);
        localStorage.setItem("countStreak", countStreak);
        localStorage.setItem("countIncorrect", countIncorrect);
        // Check if game over and call function if count incorrect = 10
        if (countIncorrect == 10) {
            setTimeout(function () {
                gameOver();
            }, 575);
        }
    }

    //Reset local storage
    function resetLocalStorage() {
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
        localStorage.setItem("hintCollection", JSON.stringify(hintCollection));
    }

    //Game win
    function gameWin() {
        // Sounds
        sound = "audio#win-sound";
        playSound(sound);
        // Clear timer interval
        clearTimer();
        // Display win message
        $(".keyboard-container").addClass("hide");
        $("#game-win").removeClass("hide");
        // Hide hint if displayed
        if (!$("#hint-content").hasClass("hide")) {
            $("#hint-content").addClass("hide");
        }
        $("#hint").addClass("hide");
        // Reset isPlaying to false
        isPlaying = "false";
        // Game scoring
        countWords = ++countWords;
        $(".final-score").text(score);
        $(".count-words").text(countWords);
        // Local storage
        resetLocalStorage();
    }

    // Game over
    function gameOver() {
        // Sounds
        sound = "audio#game-over-sound";
        playSound(sound);
        // Clear timer interval
        clearTimer();
        // Update game over message with stats
        $("#correct-answer").text(word);
        $(".final-score").text(score);
        $(".count-words").text(countWords);
        // Display game over
        $(".flex-container").addClass("hide");
        $("#game-over").removeClass("hide");
        // Update best score with scoring info
        if (parseInt($("#best-score").text()) < score) {
            $(".best-score-container").removeClass("hide");
            $("#best-score").text(score);
            localStorage.setItem("bestScore", score);
        }
        // Reset score to 0 when game over
        countWords = 0;
        score = 0;
        isPlaying = "false";
        $("#score").text(score);
        // Local storage
        resetLocalStorage();
    }

    // Play game - when key is pressed
    $(".key").on("click", function () {
        if (isPlaying === "true") {
            //Evaluate guess
            let isCorrectGuess = splitWord.includes($(this).text());
            let letter = $(this).text();
            //Match / noMatch
            if (isCorrectGuess) {
                match(letter);
            } else {
                noMatch();
            }
            //Disable keys
            $(this).addClass("disabled");
            //Local storage
            keyPressed.push(letter);
            localStorage.setItem("keyStorage", JSON.stringify(keyPressed));
        } else {
            return;
        }
    });

    // Leave game

    function displayHomePage() {
        $(".word").empty().addClass("hide");
        $("#start").removeClass("hide");
        $("#hint").addClass("hide");
        $(".key").removeClass("disabled");
        $.each($("path"), function () {
            $(this).removeClass("hide");
        });
        if (parseInt($("#score").text()) == 0) {
            $("#start").text("play");
        } else {
            $("#start").text("continue");
        }
        if ($(".keyboard-container").hasClass("hide")) {
            resetDisplayAfterWin();
        }
        if ($(".flex-container").hasClass("hide")) {
            resetDisplayAfterGameOver();
        }
    }

    $(".leave").on("click", function () {
        displayHomePage();
    });

    // Record best score to leaderboard

    //Sort JSON array --> leaderboard
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

    // Function adding best score to leaderboard
    function addToLeaderboard() {
        let playerName = $("#scorename").val();
        let today = new Date();
        today = today.toLocaleDateString();
        let leaderboard = JSON.parse(localStorage.getItem("arrayBestScores"));
        let recScore = localStorage.getItem("bestScore");
        let addPlayerDetails = {
            "date": `${today}`,
            "name": `${playerName}`,
            "score": `${recScore}`
        };
        //Update leaderboard html
        if (leaderboard.length >= 1) { // Update existing leaderboard table
            leaderboard.push(addPlayerDetails);
            leaderboard.sort(sortOrder("score")); //sort array
            // Append thml
            $("#lead-table").append(`<tr><td>${today}</td><td>${playerName}</td><td>${recScore}</td></tr>`);
            // Insert new best score after head row
            $(`tr:contains(${recScore})`).insertAfter('#head-row');
        } else {
            leaderboard.push(addPlayerDetails); // Update leaderboard html with new table
            $("#leaderboard").html(`
             <table id="lead-table">
             <tr id="head-row"><th>date</th><th>name</th><th>score</th></tr>
             <tr><td>${today}</td><td>${playerName}</td><td>${recScore}</td></tr>
             </table>
             `);
        }
        //Update local storage
        localStorage.setItem("arrayBestScores", JSON.stringify(leaderboard));
        //Reset input field
        $("#scorename").val("");
    }

    /* delay function when name is entered in input field so that
        - if key pressed within 1350 seconds, actions set in call back function are delayed 
        - If no key pressed within 1350 seconds, actions set in callback function are running
          and timeout is cleared. 
        
    */

    //https://stackoverflow.com/questions/14042193/how-to-trigger-an-event-in-input-text-after-i-stop-typing-writing
    let delay = (function () {
        let timerDelay = 0;
        return function (callback, ms) {
            clearTimeout(timerDelay);
            timerDelay = setTimeout(callback, ms);
        };
    })();

    // Update leaderboard and display success notification once player has typed his name 
    $("#scorename").keyup(function () {
        delay(function () {
            addToLeaderboard();
            $("#scorename-container").addClass("hide");
            $("#save-notification").removeClass("hide");
        }, 1350);
    });

});