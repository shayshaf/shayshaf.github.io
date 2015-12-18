$(function() {
    var ThankYou = {

        init: function () {

        },

        bindFeedbackSubmit: function() {
            $('#feedback-button').on('click', function(){
                //TODO add validations
                //ThankYou.dataValidationBeforeSending();
                ThankYou.disableSubmitButton();
                ThankYou.sendTheData();
            })
        },

        disableSubmitButton: function(){
            $('#feedback-button').html('Sending ... ').prop('disabled', true);
        },


        dataValidationBeforeSending: function(){
            var errors = [],
                possibleChecks = ['integer-feedback', 'free_text'];

            // clear past errors
            $.each(possibleChecks, function(_, possibleCheck){
                $('#error-' +possibleCheck).empty()
            });


            //check for new errors
            if ($('input[name="feedback-radio"]:checked').length < 1) {
                errors.push({'id': 'integer-feedback', errorMessage: 'בחר לפחות אחד'})
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
            var buyerOrSeller = $('input[name=buyer-sellers]:checked').closest('label').text(),
                idealTimeForSideProject = $('input[name=ideal-time]:checked').closest('label').text(),
                mainAbilities = [],
                abilityOther = $('input[name=abilities-other]').val(),
                mainMotivationOther = $('input[name=main-motivation-other]').val(),
                mainMotivationReason = $('input[name=main-motivation]:checked').closest('label').text(),
                freeText = $('#free_text').val(),
                email = Global.Email,
                Feedback = Parse.Object.extend('Feedback'),
                feedback = new Feedback();

            $.each($('#abilities input:checked'), function(){
                mainAbilities.push($(this).closest('label').text().replace(/(\r\n|\n|\r)/gm,""));
            });

            if (abilityOther != ""){
                mainAbilities.push(abilityOther)
            }

            mainMotivationReason = mainMotivationOther || mainMotivationReason;
            feedback.set("buyerOrSeller", buyerOrSeller);
            feedback.set("idealTimeForSideProject", idealTimeForSideProject);
            feedback.set("mainAbilities", mainAbilities);
            feedback.set("mainMotivationReason", mainMotivationReason);
            feedback.set("freeText", freeText);
            feedback.set("email", email);

            feedback.save(null, {
                success: function(feedback) {
                    //TODO send a google analytics event here
                    console.log('New object created with objectId: ' + feedback.id);
                    //after data sent confirmation, change to the thank you page
                    window.location.replace("#/feedback-thank-you");
                },
                error: function(user, error) {
                    //TODO send a google analytics event here
                    console.log('Failed to create new object, with error code: ' + error.message);
                    BootstrapDialog.alert({message:"We couldn't process that, please try again later.",
                        type: BootstrapDialog.TYPE_WARNING,
                        title: "We are so sorry"})
                }
            });

        },
    };

    window.ThankYou = ThankYou;

    $(document).ready(function() {

        ThankYou.init();
    });

});