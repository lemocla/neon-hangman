/*jshint esversion: 6 */
/* globals $:false */
/* globals localStorage:false */

$(document).ready(function () {
    /*-----------------------[ WebAPI ]---------------------------*/
    /*
    localStorage.removeItem('level', 'easy');
    localStorage.removeItem('sound', 'on');
    localStorage.removeItem('best-score', 0);
    let arrayBestScores = [];
    localStorage.removeItem('leaderboard', arrayBestScores);
    */
    if (typeof (Storage) !== "undefined") {
        //Level
        if (localStorage.level) {
            let storedLevel = localStorage.getItem('level');
            $(`.btn-level[data-level=${storedLevel}]`).addClass('active');
            $(`.btn-level.active[data-level!=${storedLevel}]`).removeClass('active');
            $('.level').text(storedLevel);

        } else {
            localStorage.setItem('level', 'easy');
        }
        //Sounds
        if (localStorage.sound) {
            let storedSound = localStorage.getItem('sound');
            $(`.btn-volume[data-sound=${storedSound}]`).addClass('active');
            $(`.btn-volume.active[data-sound!=${storedSound}]`).removeClass('active');
            let src = ((storedSound == 'on') ? "assets/images/soundon.svg" : "assets/images/soundoff.svg");
            $('img[data-attr=sound]').attr('src', src);
        } else {
            localStorage.setItem('sound', 'on');
        }
        //Best score
        if (localStorage.bestScore) {
            $('#best-score').text(localStorage.getItem('bestScore'));
        } else {
            localStorage.setItem('bestScore', 0);
        }
    } else {
        localStorage.setItem('level', 'easy');
        localStorage.setItem('sound', 'on');
        localStorage.setItem('best-score', 0);
        /*
        let arrayBestScores = [];
        localStorage.setItem('leaderboard', arrayBestScores);
        
        console.log("level api = " + localStorage.getItem('level'));
        console.log("sound api = " + localStorage.getItem('sound'));
        console.log("best-score api = " + localStorage.getItem('best-score'));
        console.log("leaderboard = " + localStorage.getItem('leaderboard'));
        */
    }



    /*----------------------[ Toggle menu ]-----------------------*/

    $('#toggle-nav').on("click", function () {
        $('.menu-container').toggle();
        updateDispay = $('.menu-container').css('display') == 'block' ? $(this).attr('src', 'assets/images/close.svg') : $(this).attr('src', 'assets/images/cog.svg');
    });

    /*----------------[ Display menu items content ]----------------*/

    $('.btn-menu').on("click", function () {
        let contentId = $(this).attr("data-content");
        $("#" + contentId).toggle();
        //Hide content from other menu items 
        //https://stackoverflow.com/questions/1616006/jquery-select-all-br-with-displaynone/15373670
        let menuItems = $(`div[id!=${contentId}][data-type="menu-content"][style='display: block;']`);
        if (menuItems.length > 0) {
            menuItems.css("display", "none");
        }
    });

    /*-------------------[ Select level items ]-------------------*/

    $('.btn-level').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-level.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
        //Update game info section
        $('.level').text($(this).text());
        //Local Storage
        localStorage.setItem('level', $(this).text());
    });

    /*-------------------[ Select volume items ]-------------------*/

    $('.btn-volume').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-volume.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
        // Update game info section
        let src = (($(this).attr('data-sound') == 'on') ? "assets/images/soundon.svg" : "assets/images/soundoff.svg");
        $('img[data-attr=sound]').attr('src', src);
        //Local Storage
        localStorage.setItem('sound', $('.btn-volume.active').attr('data-sound'));
    });

    /*---------[ Turn sound on and off from game info ]-----------*/

    function turnSound(current, val) {
        $(`.btn-volume[data-sound=${current}]`).removeClass('active');
        $(`.btn-volume[data-sound=${val}]`).addClass('active');
        //Local Storage
        localStorage.setItem('sound', val);
        return `assets/images/sound${val}.svg`;
    }

    $('img[data-attr=sound]').on("click", function () {
        let src;
        if ($(this).attr('src') == "assets/images/soundon.svg") {
            src = turnSound('on', 'off');
        } else if ($(this).attr('src') == "assets/images/soundoff.svg") {
            src = turnSound('off', 'on');
        }
        $('img[data-attr=sound]').attr('src', src);
    });

    /*----------------[ Open/close modal forms ]------------------*/

    $('#contact-us').on('click', function () {
        $('#modal-form').toggleClass('hide');
    });

    function closeModal(obj) {
        let modal = $(obj).attr('data-close');
        $(`#${modal}`).addClass('hide');
    }

    $('.close-modal').on('click', function () {
        closeModal(this);
    });

    $('.btn-form').on('click', function () {
        closeModal(this);
    });

});


