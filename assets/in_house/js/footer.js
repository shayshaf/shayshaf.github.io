$(function() {
    var Footer = {

        init: function () {

            Footer.bindChangeColor();
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

    window.Footer = Footer;

    $(document).ready(function() {
        Footer.init();
    });

});