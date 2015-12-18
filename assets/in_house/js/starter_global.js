$(function() {
    var Global = {

        finishedInitEvent: undefined,
        Templates: {},

        init: function () {

            // this event will be fired when the settings key has finished initiating
            Global.finishedInitEvent = new CustomEvent('globalHasInitiated', { data: {} });

            //all init data
            Global.init1();
        },

        init1: function(){
             p('initiated the foo and the bar, happy.');

            document.dispatchEvent(Global.finishedInitEvent);
            // fires when the Global has finished populating the settings
            //document.addEventListener('globalHasInitiated', function (event) {
            //    FeatureExample.init();
            //}, false);
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