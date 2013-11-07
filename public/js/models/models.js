window.Wine = Backbone.Model.extend({

    urlRoot: "/voisin",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.email = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Vous n'avez pas saisie votre email"};
        };

        this.validators.login = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Vous n'avez pas saisie votre login"};
        };

        this.validators.pwd = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Vous n'avez pas saisie votre mot de passe"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        email: "",
        login: "",
        pwd: "USA"
    }
});

window.VoisinCollection = Backbone.Collection.extend({

    model: Wine,

    url: "/voisins"

});