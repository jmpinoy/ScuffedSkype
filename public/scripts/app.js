$(document).ready(function () {
    let params = new URLSearchParams(document.location.search.substring(1));
    let name = params.get("name")
    document.getElementsByClassName('app-head')[0].innerHTML = "hello " + name;

    $('.app-head').fadeIn(1000, function () {
        $(this).css({ "visibility": "show", display: 'block' });
    })

    // fix later
    setTimeout(function () {
        $('.app-head').fadeOut(2000, function () {
            $(this).css({ 'visibility': 'hidden', 'display': 'none' });
            $('#app-heading-container').css({ 'visibility': 'hidden', 'display': 'none' });
        })

    }, 100);

    // fix later
    setTimeout(function() {
        $("#chat-container").hide().slideDown(1000);
    }, 2500);
});