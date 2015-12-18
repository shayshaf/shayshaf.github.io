$(function() {
    var Sammy = {

        init: function () {

            Sammy.setUpRoutes();
        },

        setUpRoutes: function(){
            var app = $.sammy(function() {

                this.get('#/', function() {
                    $("#header").load("templates/header.html.erb");
                    $("#main-block").load("templates/first-page.html.erb", function() {
                        Global.init();
                    });

                    $("#footer").load("templates/footer.html.erb")
                });


                this.get('#/feedback', function() {
                    $("#header").load("templates/header.html.erb");
                    $("#main-block").load("templates/thank-you.html.erb", function(){
                        ThankYou.bindFeedbackSubmit();
                    });

                    $("#footer").load("templates/footer.html.erb", function() {
                        Global.init();
                    })
                });

                this.get('#/feedback-thank-you', function() {
                    $("#header").load("templates/header.html.erb");
                    $("#main-block").load("templates/feedback-thank-you.html.erb");
                    $("#footer").load("templates/footer.html.erb", function() {
                        Global.init();
                    })
                });

            });

            // start the application
            app.run('#/');
        }
    };

    window.Sammy = Sammy;

    $(document).ready(function() {
        function initSammy() {
            if ($.sammy == undefined) {
                console.log('sammy not ready yet');
                setTimeout(initSammy, 200);
            }else{
                console.log('sammy is ready');
                Sammy.init();
            }
        }

        initSammy()
    });

});