/*jshint esversion: 6 */
/* globals $:false */
/* globals localStorage:false */

$(document).ready(function () {

    // Functions to prepare leaderboard table

    // Function to sort JSON array in descending order 
    // https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/
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

    // Function to create leaderboard table / default content 
    function createLeaderboard(bestScores) {
        let dataScores = JSON.parse(bestScores);
        // Sorts JSON array in descending order
        dataScores.sort(GetSortOrder("score"));
        if (dataScores.length >= 1) {
            let dataHeaders = dataScores[0];
            // Table headers
            let thArray = [];
            $.each(dataHeaders, function (key) {
                let thString = "<th>" + key + "</th>";
                thArray.push(thString);
            });
            let thRow = thArray.join(" ");
            let tableHeaders = "<tr id='head-row'>" + thRow + "</tr>";
            // Table rows
            let trArray = [];
            $.each(dataScores, function (key, value) {
                let tdArray = [];
                Object.values(value).forEach(function (key, value) {
                    tdArray.push("<td>" + key + "</td>");
                });
                let tdString = tdArray.join(" ");
                trArray.push("<tr>" + tdString + "</tr>");
            });
            let tableRows = trArray.join(" ");
            // Table content
            $("#leaderboard").append("<table id='lead-table'>" + tableHeaders + tableRows + "</table>");
        } else {
            $("#leaderboard").append("<p>No information yet!</p>"); //default content if no data
        }
    }

    /*Local storage
        Get items from local storage
        Update website content with local storage
        Set default local storage if data is not set
    */

    if (typeof (Storage) !== "undefined") {
        //Level
        if (localStorage.level) {
            let storedLevel = localStorage.getItem("level");
            $(`.btn-level[data-level=${storedLevel}]`).addClass("active");
            $(`.btn-level.active[data-level!=${storedLevel}]`).removeClass("active");
        } else {
            localStorage.setItem("level", "easy");
        }
        //Categories
        if (localStorage.category) {
            let storedCategory = localStorage.getItem("category");
            //Apply category being played for game in progress
            if (localStorage.isPlaying && localStorage.getItem("isPlaying") === "true") {
                storedCategory = localStorage.getItem("isPlayingCategory");
            }
            $(`.btn-category[data-category=${storedCategory}]`).addClass("active");
            $(`.btn-category.active[data-category!=${storedCategory}]`).removeClass("active");
            $('.category').text(storedCategory);
        } else {
            localStorage.setItem("category", "dictionary");
        }
        //Sounds
        if (localStorage.sound) {
            let storedSound = localStorage.getItem("sound");
            $(`.btn-volume[data-sound=${storedSound}]`).addClass("active");
            $(`.btn-volume.active[data-sound!=${storedSound}]`).removeClass("active");
            let src = ((storedSound == 'on') ? "assets/images/soundon.svg" : "assets/images/soundoff.svg");
            $("img[data-attr=sound]").attr("src", src);
        } else {
            localStorage.setItem("sound", "on");
        }
        //Scores
        if (localStorage.score) {
            $("#score").text(localStorage.getItem("score"));
            //Apply content to start button if player is continuing a game
            if (parseInt($("#score").text()) > 0 && localStorage.getItem("isPlaying") === "false") {
                $('#start').text("continue");
            } else {
                $("#start").text("play");
            }
        } else {
            localStorage.setItem("score", 0);
        }
        //Best score
        if (localStorage.bestScore) {
            $("#best-score").text(localStorage.getItem("bestScore"));
        } else {
            localStorage.setItem("bestScore", 0);
        }
        //Leaderboard 
        if (localStorage.arrayBestScores) {
            let bestScores = localStorage.getItem("arrayBestScores");
            //creates leaderboard table/default content
            createLeaderboard(bestScores); 
        } else {
            let arrayBestScores = [];
            localStorage.setItem("arrayBestScores", JSON.stringify(arrayBestScores));
            $("#leaderboard").append("<p>No information yet!</p>");
        }
    } else {
        localStorage.setItem("level", "easy");
        localStorage.setItem("category", "dictionary");
        localStorage.setItem("sound", "on");
        localStorage.setItem("best-score", 0);
        localStorage.setItem("score", 0);
        localStorage.setItem("countWords", 0);
        localStorage.setItem("isPlaying", "false");
    }

    // Navigation and menu items

    // Toggle menu container
    $('#toggle-nav').on("click", function () {
        $(".menu-container").toggle();
        //Update toggle-nav image
        if ($(".menu-container").css("display") == "block") {
            $(this).attr("src", "assets/images/close.svg");
            //Collaspe all menu content if displayed
            $(".menu-content[style='display: block;']").toggle();
        } else {
            $(this).attr("src", "assets/images/cog.svg");
        }
    });

    // Display menu items content
    $(".btn-menu").on("click", function () {

        let contentId = $(this).attr("data-content");
        $("#" + contentId).toggle();
        //Hide content from other menu items 
        //https://stackoverflow.com/questions/1616006/jquery-select-all-br-with-displaynone/15373670
        let menuItems = $(`div[id!=${contentId}][data-type="menu-content"][style="display: block;"]`);
        if (menuItems.length > 0) {
            menuItems.css("display", "none");
        }
    });

    // Select level items
    $(".btn-level").on("click", function () {
        //Add active class to selected element
        $(this).addClass("active");
        //Remove active class to all other elements
        let activeBtn = $(".btn-level.active").not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass("active");
        }
        //Update game info section
        $('.level').text($(this).text());
        //Update local Storage
        localStorage.setItem("level", $(this).text());
    });

    // Select categories
    $(".btn-category").on("click", function () {
        //Add active class to selected element
        $(this).addClass("active");
        //Remove active class to all other elements
        let activeBtn = $(".btn-category.active").not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass("active");
        }
        //Update game info section
        $(".category").text($(this).text());
        //Update local Storage
        localStorage.setItem("category", $(this).text());

    });

    // Select sound options in settings
    $(".btn-volume").on("click", function () {
        // Add active class to selected element
        $(this).addClass("active");
        // Remove active class to all other elements
        let activeBtn = $(".btn-volume.active").not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass("active");
        }
        // Update game info section
        let src = (($(this).attr("data-sound") == "on") ? "assets/images/soundon.svg" : "assets/images/soundoff.svg");
        $("img[data-attr=sound]").attr("src", src);
        // Update local Storage
        localStorage.setItem("sound", $(".btn-volume.active").attr("data-sound"));
    });

    // Turn sound on and off from game info
       
    // Function to return return sound image src & update settings
    function turnSound(current, val) {
        // Update sound in settings
        $(`.btn-volume[data-sound=${current}]`).removeClass("active");
        $(`.btn-volume[data-sound=${val}]`).addClass("active");
        // Update local Storage
        localStorage.setItem("sound", val);
        return `assets/images/sound${val}.svg`;
    }

    // Turn sound on / off when image is clicked
    $("img[data-attr=sound]").on("click", function () {
        let src; //update image sound on / off
        if ($(this).attr("src") == "assets/images/soundon.svg") {
            src = turnSound("on", "off");
        } else if ($(this).attr("src") == "assets/images/soundoff.svg") {
            src = turnSound("off", "on");
        }
        $("img[data-attr=sound]").attr("src", src);
    });

    // Open/close modal forms

    // Displays / hides modal form from contact us button
    $("#contact-us").on("click", function () {
        $("#modal-form").toggleClass("hide");
    });

    // Function to hide modals on click events
    function closeModal(obj) {
        let modal = $(obj).attr("data-close");
        $(`#${modal}`).addClass("hide");
    }

    // Closes modal using close icons
    $(".close-modal").on("click", function () {
        closeModal(this);
    });

    // Closes modal using buttons
    $(".btn-form").on("click", function () {
        closeModal(this);
    });

});