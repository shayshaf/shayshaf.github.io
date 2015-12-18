$(function() {
    var Global = {

        Email: undefined,
        colors: ['light-green', 'light-blue', 'navy', 'orange'],
        currentColor: 0,

        init: function () {

            Global.bindFormSubmit();
            Global.bindChangeColor();
        },

        //open faq popup on click
        bindFaqClick: function(){
            $('.why-link-js').on('click', function(){
                BootstrapDialog.alert({
                    title: 'FAQ',
                    message: $('<div></div>').load('templates/faq.html.erb')
                });
            });
        },

        bindFormSubmit: function(){
            $('#notify-me').on('click', function(){
                Global.formSubmit()
            });

            //$('#notify-form').bind('keypress', function(e) {
            //    e.preventDefault();
            //    var code = e.keyCode || e.which;
            //    if(code == 13) { //'Enter' keycode
            //        Global.formSubmit();
            //    }
            //});
        },

        formSubmit: function(){
            Global.dataValidationBeforeSending();
            Global.disableSubmitButton();
            Global.sendTheData();
        },

        disableSubmitButton: function(){
            $('#notify-me').html('Sending ... ').prop('disabled', true);
        },


        dataValidationBeforeSending: function(){
            var errors = [],
                possibleChecks = ['email'];

            // clear past errors
            $.each(possibleChecks, function(_, possibleCheck){
                $('#error-' +possibleCheck).empty()
            });

            //check for new errors
            if (!Global.isEmail($('#email').val())) {

                errors.push({'id': 'email', errorMessage: 'אימייל לא תקין'})
            }

            if (errors.length > 0){
                $.each(errors, function(_, errorData){
                    // add the error text to the html here
                    $('#error-' + errorData.id).html(errorData.errorMessage)
                });
                throw "Cant sent form , has errors"
            }
        },

        sendTheData: function(){
            var email = $('#email').val();

            var Email = Parse.Object.extend('Emails');
            var user = new Email();

            user.set("email", email);

            user.save(null, {
                success: function(user) {
                    //TODO send a google analytics event here
                    console.log('New object created with objectId: ' + user.id);
                    //after data sent confirmation, change to the thank you page
                    Global.Email = email;
                    window.location.replace("#/feedback");
                },
                error: function(user, error) {
                    //TODO send a google analytics event here
                    console.log('Failed to create new object, with error code: ' + error.message);
                    //TODO error message to user
                    BootstrapDialog.alert({message:"We couldn't process that, please try again later.",
                        type: BootstrapDialog.TYPE_WARNING,
                        title: "We are so sorry"})
                }
            });


        },

        isEmail: function(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },


        bindChangeColor: function(){
            $('#color-change').on('click', function(event){
                event.preventDefault();

                var oldColor, newColor;

                oldColor = Global.colors[Global.currentColor];
                Global.currentColor += 1;
                if (Global.currentColor > Global.colors.length -1){
                    Global.currentColor = 0;
                }

                newColor = Global.colors[Global.currentColor];

                $('#vision-message').switchClass(oldColor, newColor, 'fast');
                $('#notify-me').switchClass(oldColor + '-background', newColor+ '-background', 'fast');
                $('#feedback-button').switchClass(oldColor + '-background', newColor+ '-background', 'fast');
                // send a google analytics event about it
                ga('send', 'color-change');
            });
        }

    };

    window.Global = Global;

    $(document).ready(function() {
        //global easy to use methods
        function p(message){
            console.log(message);
        }

        window.p = p;

        Global.init();
    });

});