$(document).ready(function () {

    // Toggle menu

    $('#toggle-nav').on("click", function () {
        $('.menu-container').toggle();
        navDisplay = $('.menu-container').css('display');

        if (navDisplay == 'block') {
            $(this).attr('src', 'assets/images/close.svg');
        } else $(this).attr('src', 'assets/images/cog.svg');
    })

    // Display menu items content 

    $('.btn-menu').on("click", function () {
        let contentId = $(this).attr("data-content");
        $("#" + contentId).toggle();
        //https://stackoverflow.com/questions/1616006/jquery-select-all-br-with-displaynone/15373670
        let menuItems = $(`div[id!=${contentId}][data-type="menu-content"][style='display: block;']`);
        if (menuItems.length > 0) {
            menuItems.css("display", "none");
        }
    });

    // Select level items 

    $('.btn-level').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-level.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
        // Update game info section
        $('.level').text($(this).text());
        //console.log($(this).text());
    });

    // Select volume items

    $('.btn-volume').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-volume.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
        // Update game info section
        let src = (($(this).attr('data-sound') == 'on') ? "assets/images/soundon.svg" : "assets/images/soundoff.svg")
        $('img[data-attr=sound]').attr('src', src);
        //console.log(src);
    });

    // Turn sound on and off from game info
    $('img[data-attr=sound]').on("click", function()
    {
        let test = $(this).attr('src');
        let src;
        if ($(this).attr('src') == "assets/images/soundon.svg") {

        src = "assets/images/soundoff.svg";
        $('.btn-volume[data-sound=on]').removeClass('active');
        $('.btn-volume[data-sound=off]').addClass('active');

        } else if ($(this).attr('src') == "assets/images/soundoff.svg")
        {
        src= "assets/images/soundon.svg";
        $('.btn-volume[data-sound=off]').removeClass('active');
        $('.btn-volume[data-sound=on]').addClass('active');
        }

        $('img[data-attr=sound]').attr('src', src);

    });


    // Open/close modal forms

    $('#contact-us').on('click', function () {
        $('#modal-form').toggleClass('hide');
    });

    $('#close-modal').on('click', function () {
        $('#modal-form').addClass('hide');
    });
});