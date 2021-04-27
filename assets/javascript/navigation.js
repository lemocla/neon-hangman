$(document).ready(function () {

    /*-----------------------[ Toggle menu]-----------------------*/

    $('#toggle-nav').on("click", function () {
        $('.menu-container').toggle();
        ($('.menu-container').css('display') == 'block' ? $(this).attr('src', 'assets/images/close.svg') : $(this).attr('src', 'assets/images/cog.svg'));
    })

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
        // Update game info section
        $('.level').text($(this).text());
    });

    /*-------------------[ Select volume items ]-------------------*/

    $('.btn-volume').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-volume.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
        // Update game info section
        let src = (($(this).attr('data-sound') == 'on') ? "assets/images/soundon.svg" : "assets/images/soundoff.svg")
        $('img[data-attr=sound]').attr('src', src);
    });

    /*---------[ Turn sound on and off from game info ]-----------*/

    function turnSound(current, val) {
        //src = `assets/images/sound${val}.svg`;
        $(`.btn-volume[data-sound=${current}]`).removeClass('active');
        $(`.btn-volume[data-sound=${val}]`).addClass('active');
        //console.log(src);
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

    $('#close-modal').on('click', function () {
        $('#modal-form').addClass('hide');
    });
});