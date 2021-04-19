$(document).ready(function() {

 /*cog*/
 $('#toggle-nav').on("click", function(){
 $('.menu-container').toggle();
 navDisplay = $('.menu-container').css('display');

 if (navDisplay == 'block'){
 $(this).attr('src', '/assets/images/close.svg');
 }
 else $(this).attr('src', '/assets/images/cog.svg');
 })
});
