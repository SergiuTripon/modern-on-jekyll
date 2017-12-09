// contact process

// checks email address
function isEmailValid(email) {
    var regex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return regex.test(email);
}

// variable to hold error status
var hasError = false;

// check fullname while the user is typing
$("#fullname").on("change keyup", function(e) {
    var fullname = $('#fullname').val();
    if (e.keyCode != 9 && e.keyCode != 20) {
        if (fullname === '') {
            $("#icon-fullname-success").hide();
            $("#icon-fullname-fail").show();
            $("#text-fullname-fail").show();
        } else {
            $("#icon-fullname-fail").hide();
            $("#text-fullname-fail").hide();
            $("#icon-fullname-success").show();
        }
    }
});

// check email while the user is typing
$("#email").on("change keyup", function(e) {
    var email = $('#email').val();
    if (e.keyCode != 9 && e.keyCode != 20) {
        if (email === '') {
            $("#text-invalid-email-fail").hide();
            $("#icon-email-success").hide();
            $("#icon-email-fail").show();
            $("#text-no-email-fail").show();
        } else {
            if(!isEmailValid(email)) {
                $("#text-no-email-fail").hide();
                $("#icon-email-success").hide();
                $("#icon-email-fail").show();
                $("#text-invalid-email-fail").show();
            } else {
                $("#text-invalid-email-fail").hide();
                $("#icon-email-fail").hide();
                $("#text-no-email-fail").hide();
                $("#icon-email-success").show();
            }
        }
    }
});

// check phonenumber while the user is typing
$("#phonenumber").on("change keyup", function(e) {
    var phonenumber = $('#phonenumber').val();
    if (e.keyCode != 9 && e.keyCode != 20) {
        if (phonenumber === '') {
            $("#icon-phonenumber-success").hide();
            $("#icon-phonenumber-fail").show();
            $("#text-phonenumber-fail").show();
        } else {
            $("#icon-phonenumber-fail").hide();
            $("#text-phonenumber-fail").hide();
            $("#icon-phonenumber-success").show();
        }
    }
});

// check message while the user is typing
$("#message").on("change keyup", function(e) {
    var message = $('#message').val();
    if (e.keyCode != 9 && e.keyCode != 20) {
        if (message === '') {
            $("#icon-message-success").hide();
            $("#icon-message-fail").show();
            $("#text-message-fail").show();
        } else {
            $("#icon-message-fail").hide();
            $("#text-message-fail").hide();
            $("#icon-message-success").show();
        }
    }
});

// variable to hold contact submit
var contact_submit = $("#contact-submit");
// variable to hold form fail
var form_fail = $(".form-fail");
// variable to hold form success
var form_success = $(".form-success");

// on contact submit click event
contact_submit.click(function (e) {
    e.preventDefault();

    // change text on contact submit
    contact_submit.html('Working on it...');

    // check fullname is inputted
    var fullname = $('#fullname');
    var fullname_value = fullname.val();
    if (fullname_value === '') {
        $("#icon-fullname-success").hide();
        fullname.focus();
        $("#icon-fullname-fail").show();
        $("#text-fullname-fail").show();
        $('#contact-submit').html('Send');
        hasError  = true;
        return false;
    } else {
        $("#icon-fullname-fail").hide();
        $("#text-fullname-fail").hide();
        $("#icon-fullname-success").show();
    }

    // check email is inputted
    var email = $('#email');
    var email_value = email.val();
    if(email_value === '') {
        $("#icon-email-success").hide();
        email.focus();
        $("#icon-email-fail").show();
        $("#text-no-email-fail").show();
        $('#contact-submit').html('Send');
        hasError  = true;
        return false;
    } else {
        $("#icon-email-fail").hide();
        $("#text-no-email-fail").hide();
        $("#icon-email-success").show();
    }

    // check email is valid
    if(!isEmailValid(email_value)) {

        $("#text-no-email-fail").hide();
        $("#icon-email-success").hide();
        email.focus();
        $("#icon-email-fail").show();
        $("#text-invalid-email-fail").show();
        $('#contact-submit').html('Send');
    } else {
        $("#text-invalid-email-fail").hide();
        $("#icon-email-fail").hide();
        $("#text-no-email-fail").hide();
        $("#icon-email-success").show();
    }

    // check phone number is inputted
    var phonenumber = $('#phonenumber');
    var phonenumber_value = phonenumber.val();
    if(phonenumber_value === '') {
        $("#icon-phonenumber-success").hide();
        phonenumber.focus();
        $("#icon-phonenumber-fail").show();
        $("#text-phonenumber-fail").show();
        $('#contact-submit').html('Send');
        hasError  = true;
        return false;
    } else {
        $("#icon-phonenumber-fail").hide();
        $("#text-phonenumber-fail").hide();
        $("#icon-phonenumber-success").show();
    }

    // check message is inputted
    var message = $('#message');
    var message_value = message.val();
    if(message_value === '') {
        $("#icon-message-success").hide();
        message.focus();
        $("#icon-message-fail").show();
        $("#text-message-fail").show();
        $('#contact-submit').html('Send');
        hasError  = true;
        return false;
    } else {
        $("#icon-message-fail").hide();
        $("#text-message-fail").hide();
        $("#icon-message-success").show();
    }

    // if there are no errors, initialize the ajax call
    if(hasError == false){
        $.ajax({
            url: "https://formspree.io/" + formspree_email,
            method: "POST",
            data: {full_name: fullname_value, email_address: email_value, phone_number: phonenumber_value, message: message_value},
            dataType: "json",

            // if action completed, do the following
            success:function(isEmailValid){
                if (isEmailValid == 'FALSE') {
                    $("#text-no-email-fail").hide();
                    $("#icon-email-success").hide();
                    $("#email").focus();
                    $("#icon-email-fail").show();
                    $("#text-invalid-email-fail").show();
                    $('#contact-submit').html('Send');
                } else {
                    $("#form-fail").addClass('hidden');
                    $("#form-contact").hide();
                    form_success.removeClass('hidden');
                    form_success.html('Thanks for contacting me, <b>' + fullname_value.split(' ')[0] + '</b>. I\'ll be in touch shortly.');
                }
            },

            // if action failed, do the following
            error:function (xhr, ajaxOptions, thrownError){
                $(".form-success").addClass('hidden');
                form_fail.removeClass('hidden');
                form_fail.html('<b>Error</b>: ' + thrownError);
                $('#contact-submit').html('Send');
            }
        });
    }

    return true;

});