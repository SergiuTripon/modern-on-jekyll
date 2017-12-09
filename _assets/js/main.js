// add classes to img tag
$('img').not(".emoji").addClass('img-responsive img-rounded');

// ------------------------------------------------------------------------------------------------------------------ //

// initialize tooltip
$(function() {
    $("[data-toggle='tooltip']").tooltip();
});

// ------------------------------------------------------------------------------------------------------------------ //

// sets autocomplete to false if browser is webkit
// detecting chrome and safari
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

//If Chrome, do the following
if (isChrome) {
    $('input').attr('autocomplete', 'false');
}

//if chrome, do the following
if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
    $('input:-webkit-autofill').each(function(){
        var text = $(this).val();
        var name = $(this).attr('name');
        $(this).after(this.outerHTML).remove();
        $('input[name=' + name + ']').val(text);
    });
}

//if safari, do the following
if (isSafari) {
    $('input').attr('autocomplete', 'false');
}

// ------------------------------------------------------------------------------------------------------------------ //