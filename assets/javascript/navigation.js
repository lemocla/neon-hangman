$(document).ready(function () {

    /*toggle menu*/
    $('#toggle-nav').on("click", function () {
        $('.menu-container').toggle();
        navDisplay = $('.menu-container').css('display');

        if (navDisplay == 'block') {
            $(this).attr('src', '/assets/images/close.svg');
        } else $(this).attr('src', '/assets/images/cog.svg');
    })

    /* display menu items content */
    $('.btn-menu').on("click", function () {
        let contentId = $(this).attr("data-content");
        $("#" + contentId).toggle();
        //https://stackoverflow.com/questions/1616006/jquery-select-all-br-with-displaynone/15373670
        let menuItems = $(`div[id!=${contentId}][data-type="menu-content"][style='display: block;']`);
        if (menuItems.length > 0) {
            menuItems.css("display", "none");
        }
    });

    /* select levels items */
    $('.btn-level').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-level.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
    });

    /* select levels items */
    $('.btn-volume').on("click", function () {
        $(this).addClass('active');
        let activeBtn = $('.btn-volume.active').not(this);
        if (activeBtn.length > 0) {
            activeBtn.removeClass('active');
        }
    });
    
});