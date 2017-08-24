$(function() {

    var sendTo = 'lp.2o@akslop-enueaz' .split("").reverse().join("");

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
        },
        submitSuccess: function($form, event) {

            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name;

            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            var sendText =
                  "Name  :    " + name    + "\n"
                + "E-Mail:    " + email   + "\n"
                + "Telefon:   " + phone   + "\n"
                + "Nachricht: " + message

            $.ajax({
                url: "https://formspree.io/" + sendTo,
                method: "POST",
                data: JSON.stringify({
                    message: sendText
                }),
                contentType: "application/json",
                dataType: "json",
                cache: false,
                success: function() {
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Ihre Nachricht wurde versandt. Wir werden so schnell wie möglich Kontakt mit Ihnen aufnehmen.</strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append('<strong>Beim Versand der E-Mail ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns unter <a href="mailto:' + sendTo + '">' + sendTo + '</a>.');
                    $('#success > .alert-danger').append('</div>');
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function() {
    $('#success').html('');
});