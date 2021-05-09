/*jshint esversion: 6 */
/* globals $:false */

$(document).ready(function () {
    //https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_submit_prevent
    $("#form").submit(function (event) {
        event.preventDefault();
        const serviceID = "default_service";
        const templateID = "template_90dzp4a";
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                //Display modal success
                $('#modal-thankyou').removeClass("hide");
                $("#form")[0].reset();
            }, () => {
                //Display modal error
                $('#modal-error').removeClass("hide");
                $("#form")[0].reset();
            });
        $("#modal-form").addClass("hide");
    });
});