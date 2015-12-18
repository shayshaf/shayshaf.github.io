$(function() {
    var Backend = {

        init: function () {

            Backend.init_app();
        },

        init_app: function(){
            Parse.initialize("SYIAUW7oQeaebojjnJFK5QlKyIMY5lxQJTT8JDEb",
                "oXjboo3CqjULaceToc1MLrmpirri37QmyQJNjTl3");

        }
    };

    window.Backand = Backend;

    $(document).ready(function() {
        Backend.init();
    });

});