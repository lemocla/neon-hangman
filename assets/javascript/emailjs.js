/*jshint esversion: 6 */
/* globals $:false */
$(document).ready(function () {

//https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_submit_prevent
//https://jsfiddle.net/api/post/library/pure/
$("#form").submit(function (event) {
    event.preventDefault();
    const serviceID = 'default_service';
    const templateID = 'template_90dzp4a';
    this.value = "sending ...";
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            console.log('Sent!');
        }, (err) => {
            console.log(JSON.stringify(err));
        });
});

});