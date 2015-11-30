function showMessage(message) {
    var div = document.querySelector(".message_container");
    div.textContent = message;
    $(div).fadeIn();
    // $(div).fadeOut(5000, function() {
    //     div.textContent = '';
    // });
}

function showMessage() {
    var div = document.querySelector(".message_container");
    if (div.textContent.trim()) {
        $(div).fadeIn();
        // $(div).fadeOut(5000, function() {
        //     div.textContent = '';
        // });
    }
}

$(document).ready(function() {
    showMessage();
});